const examplePlanData = {
    'tasks': [],
    'repeat_intervals': []
}

class PlannerPlanPage {

    Tasks
    Intervals

    constructor() {
        window.planPage = this;
        this.getPlan();
    }


    getPlan() {
        sendAjax('getDailyPlan', {}, 'POST', (d) => {
            this.Tasks = d.tasks;
            this.Intervals = d.intervals;
            this.render()
        })
    }

    ChangeTaskStatus(task_id, status) {
        document.getElementById('remember-' + task_id).value = status;
        //GetTaskBackgroundColor(task_id);
    }

    ChangeTaskBanStatus(task_id) {
        let ban_val = document.getElementById('do_ban-' + task_id).value == 1 ? 0 : 1;
        document.getElementById('do_ban-' + task_id).value = ban_val;
        //GetTaskBackgroundColor(task_id);
    }

    GetTaskBackgroundColor(task_id) {
        let do_ban = document.getElementById('do_ban-' + task_id).value;
        let remember = $('#remember-' + task_id).val();
        let cl = "";
        if (do_ban == 1) {
            cl = "alert-danger";
        } else if (remember == 1) {
            cl = "alert-success";
        } else if (remember == 0) {
            cl = 'alert-warning';
        }

        $('#card_body-' + task_id).removeClass('alert-danger');
        $('#card_body-' + task_id).removeClass('alert-success');
        $('#card_body-' + task_id).removeClass('alert-warning');

        console.log(do_ban);
        $('#card_body-' + task_id).addClass(cl);


    }

    RemoveTaskFromPlan(task_id) {
        this.Tasks = this.Tasks.filter((v, i, a) => v.task_id != task_id);
        this.render()
    }

    OpenTaskInfo(task_id){
        window.open(location.origin + "?task_id="+task_id, '_blank').focus();
    }

    isNumeric(value) {
        return /^-?\d+$/.test(value);
    }


    SendTasks() {


        const regex = /tasks\[(\d+)\]\[(\w+)\]/gm;


        $('.task_input').each(function () {
            let input = $(this);
            let name = input.attr('name');
            console.log(name)
            const matches = name.matchAll((regex));
            for (let xuj of matches) {
                let task_index = Number.parseInt(xuj[1]);
                let field = xuj[2]
                let val = input.val();
                if (planPage.isNumeric(val)) {
                    planPage.Tasks[task_index][field] = Number.parseInt(input.val())
                } else {
                    planPage.Tasks[task_index][field] = input.val()
                }
            }

        })

        sendAjax('postDailyPlan', this.Tasks, 'POST', (d) => {
            if (d.success) {
                alert("Успешно")
            }
            $('#page-container').html('');
        })
    }

    render() {

        let html = `<div class="tasks-container">
        <h2 class="mt-2">Задачи <button onclick="planPage.SendTasks()" class="btn btn-primary">Готово</button></h2>
        <form class="row" id="plan-form" METHOD="post">
            ${this.Tasks ? this.Tasks.map((v, i, a) => this._renderTask(v, i)).join("") : ""}
        </form>
    </div>`
        $('#page-container').html(html);
    }

    _renderTask(task, task_index) {
        return `<div class="col-12 col-md-6 col-lg-4 mt-4" id="task-${task.task_id}">
                    <div class="card">
                        <div class="card-header ${task.is_repeating ? 'bg-secondary' : 'bg-primary'}" style="color: white">
                            <div class="d-flex" style="justify-content: space-between; align-items: center">
                                <div>
                                    ${task.subject_name} > ${task.collection_name}
                                </div>
                                <div>
                                    <button type="button"
                                            title="Удалить из плана"
                                            style="color: white"
                                            onclick="planPage.RemoveTaskFromPlan(${task.task_id})"
                                            class="btn ${task.is_repeating ? 'bg-secondary' : 'bg-primary'}" data-toggle="tooltip" data-placement="top"
                                    >x</button>
                                </div>
                            </div>

                        </div>
                        <div class="card-body" id="card_body-${task.task_id}">
                            <div class="d-flex" style="justify-content: space-between; align-items: center">
                                <h5 class="card-title">${task.task_name}</h5>
                                ${task.is_repeating ? `
                                
                                 <div>
                                        <button type="button" onclick="planPage.ChangeTaskStatus(${task.task_id}, 1)"
                                                class="btn btn-success" data-toggle="tooltip" data-placement="top"
                                                title="Помню">:)
                                        </button>
                                        <button type="button" onclick="planPage.ChangeTaskStatus(${task.task_id}, 0)"
                                                class="btn btn-danger" data-toggle="tooltip" data-placement="top"
                                                title="Не помню">:(
                                        </button>
                                        <input type="hidden" name="tasks[${task_index}][remember]" class="task_input"
                                               id="remember-${task.task_id}" value="0">
                                    </div>
                                ` : ""}
                                <input type="hidden" name="tasks[${task_index}][do_ban]" class="task_input"
                                       id="do_ban-${task.task_id}" value="0">
                                <input type="hidden" name="tasks[${task_index}][task_id]" class="task_input"
                                           id="task_id-${task.task_id}" value="${task.task_id}">
                            </div>
                            <div class="row">
                                <div class="col-4">
                                    <div class="form-group">
                                        <label for="task-${task.task_id}-cost">Сложность</label>
                                        <input name="tasks[${task_index}][difficulty]" type="number" max="5" min="1" class="form-control task_input" id="task-${task.task_id}-cost"
                                               placeholder="Сложность" value="${task.difficulty}">
                                    </div>
                                </div>
                                <div class="col-8">
                                    <div class="form-group">
                                        <label for="task-${task.task_id}-repeat">Тип повторения</label>
                                        <select name="tasks[${task_index}][interval_id]" class="form-control task_input" id="task-${task.task_id}-repeat">
                                        
                                            ${this.Intervals ? this.Intervals.map((v, i, a) => {
            return `<option ${task.interval_id == v.interval_id ? 'selected' : ''} value="${v.interval_id}">${v.rule}</option>`
        }).join("") : ""}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <a href="#" onclick="planPage.OpenTaskInfo(${task.task_id})" class="card-link">Описание</a>
                                <a href="#"  onclick="planPage.OpenTaskInfo(${task.task_id})" class="card-link">Решение</a>
                                
                            </div>

                        </div>
                    </div>
                </div>`
    }

}