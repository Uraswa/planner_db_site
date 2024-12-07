import json
import uuid

from flask import Flask, request, render_template, make_response, url_for, redirect

import db

app = Flask(__name__)
sessions = dict()

router = {
"getGroups": "api_get_groups",
"quitGroup": "api_exit_from_group",
"addGroup": "api_create_group",
"editGroup": "api_update_group",
"deleteGroup": "api_delete_group",
"addSubject": "api_create_subject",
"editSubject": "api_update_subject",
"deleteSubject": "api_delete_subject",
"editCollection": "api_update_collection",
"subscribeCollection": "api_subscribe_collection",
"unsubscribeCollection": "api_unsubscribe_collection",
"deleteCollection": "api_delete_collection",
"addCollection": "api_create_collection",
"addTask": "api_create_task",
"editTask": "api_update_task",
"getTask": "api_get_task",
"deleteTask": "api_delete_task",
"addSolution": "api_create_solution",
"editSolution": "api_update_solution",
"deleteSolution": "api_delete_solution",
"addComment": "api_create_comment",
"editComment": "api_update_comment",
"deleteComment": "api_delete_comment",
"getGroupInfo": "api_get_group_info",
"kickUser": "api_group_kick_user",
"unkickUser": "api_group_unkick_user",
"getDailyPlan": "api_get_daily_plan"
}

procedures = {
    'postDailyPlan': 'post_daily_plan',
    'createUser': 'api_create_user_procedure'
}

def auth():
    session_id = request.cookies.get('session_id')
    if session_id is None or session_id not in sessions:
        session_id = str(uuid.uuid4())
        sessions[session_id] = dict()
    user_id = None
    user_type = None

    session_info = sessions.get(session_id)

    if 'user_id' in session_info:
        user_id = session_info['user_id']
        user_type = session_info['user_type']

        is_blocked = db.query("SELECT is_blocked FROM users WHERE user_id = %s", (user_id,))
        if is_blocked is None or is_blocked[0]:
            session_info.clear()
            return session_id, None, None

    return session_id, user_id, user_type


@app.route('/')
def hello_world():  # put application's code here
    sess_id, user_id, user_role = auth()

    if user_id is None:
        return redirect(url_for('login'))

    resp = make_response(render_template('app.html'))
    resp.set_cookie('session_id', sess_id)
    return resp

@app.route('/join_group')
def join_group():  # put application's code here
    sess_id, user_id, user_role = auth()

    if user_id is None:
        return redirect(url_for('login'))

    user_id = int(user_id)
    group_link = request.args.get('group')
    res = db.query("SELECT * FROM src_add_user_to_group_by_invitation_link(%s, %s)", (user_id, group_link))

    resp = make_response(redirect(url_for('hello_world')))
    resp.set_cookie('session_id', sess_id)
    return resp

@app.route('/login', methods=['POST', 'GET'])
def login():  # put application's code here
    sess_id, user_id, user_role = auth()

    if user_id is not None:
        return redirect(url_for('hello_world'))

    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        rs = db.query("SELECT user_id, user_type FROM users WHERE email = %s and password =  crypt(%s, password) and is_blocked = FALSE", (email, password))

        if rs is not None:
            sessions[sess_id]['user_id'] = rs[0]
            sessions[sess_id]['user_type'] = rs[1]
            resp = make_response(redirect(url_for('hello_world')))
            resp.set_cookie('session_id', sess_id)
            return resp

    resp = make_response(render_template('login.html'))
    resp.set_cookie('session_id', sess_id)
    return resp

@app.route('/register', methods=['POST', 'GET'])
def register():  # put application's code here
    sess_id, user_id, user_role = auth()

    if user_id is not None:
        return redirect(url_for('hello_world'))

    err = ""
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        username = request.form.get('username')

        json2pass = dict()
        json2pass['email'] = email
        json2pass['password'] = password
        json2pass['username'] = username
        json2pass = json.dumps(json2pass)

        res = db.procedure('CALL api_create_user_procedure(%s, NULL)', (json2pass,))

        if res is not None and res['success']:
            user_id = res['entity_id']
            sessions[sess_id]['user_id'] = user_id
            sessions[sess_id]['user_type'] = 'default'
            resp = make_response(redirect(url_for('hello_world')))
            resp.set_cookie('session_id', sess_id)
            return resp
        if res is not None:
            err = res['error']

    resp = make_response(render_template('register.html', err=err))
    resp.set_cookie('session_id', sess_id)
    return resp


@app.route('/api', methods=['POST'])
def api():  # put application's code here
    sess_id, user_id, user_type = auth()

    if user_id is None:
        return 'NOT LOGIN'
    controller = request.args.get('controller')
    json_data = request.get_data().decode('utf-8')

    if json_data is not None:
        json_data = prepareJsonToPassInSql(json_data)

    if controller not in router:
        if controller in procedures:

            res = db.procedure(f"CALL post_daily_plan({user_id}, '{user_type}', %s, NULL)", (json_data,))
            return json.dumps(res)
        else:
            return json.dumps({"success": False, "error": "404"})

    function = router[controller]

    if json_data is None or json_data == "" or json_data == '""':
        json_data = "{}"

    res = db.query(f"SELECT * FROM {function}({user_id}, '{user_type}', %s)", (json_data,))

    if type(res) is tuple:
        if len(res) > 1:
            return json.dumps(res)
        else:
            return json.dumps(res[0])

    return json.dumps({"success": False, "error": "unknown"})

def returnNotFound():
    return json.dumps({'success': False, 'error': 'not found'})

def prepareJsonToPassInSql(json):
    return json

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000)
