const exampleDataGroup = {
    entity_id: 1,
    name: "Общая группа",
    can_kick: true
}

const exampleGroupMembers = [
    {
        user_id: 1,
        user_name: "123",
        is_blocked: false,
        can_be_kicked: true
    },
     {
        user_id: 2,
        user_name: "Владислав",
        is_blocked: false,
        can_be_kicked: false
    },
    {
        user_id: 3,
        user_name: "Арториас Путник Бездны",
        is_blocked: true,
        can_be_kicked: true
    }
]

class PlannerGroupPage {

    Group;
    GroupMembers;
    constructor(group) {
        console.log(group)
        window.groupPage = this;
        this.Group = group;
        this.getMembers();
    }

    getMembers(){
        sendAjax('getGroupInfo', {'entity_id': this.Group.entity_id}, 'POST', (d) => {
            this.GroupMembers = d.members;
            this.render()
        });
    }

    render(){
        let html = `
        
            <h5>Участники группы</h5>
            ${this.renderMembers()}
        
        `
         $('#page-container').html(html);
    }

    banUser(user_id){
        sendAjax("kickUser", {
            "entity_id": this.Group.entity_id,
            "user2kick": user_id
        }, 'POST', (d) => {
            if (d.success) {
                let user = this.GroupMembers.find((v,i,a) => v.user_id == user_id);
                user.is_blocked = true;
                this.render()
            }
        }, {
            'success': true
        })
    }

    unbanUser(user_id){
        sendAjax("unkickUser", {
            "entity_id": this.Group.entity_id,
            "user2kick": user_id
        }, 'POST', (d) => {
            if (d.success) {
                let user = this.GroupMembers.find((v,i,a) => v.user_id == user_id);
                user.is_blocked = false;
                this.render()
            }
        }, {
            'success': true
        })
    }

    renderMembers(){
        return this.GroupMembers.map((v,i,a) => {
            return `
                  <div class="card">
                      <div class="card-body">
                        <div class="" style="display: flex; justify-content: space-between;">
                            <div>
                            ${v.user_name}
                            </div>
                            <div class="">
                                ${v.is_blocked ? `<button class="btn btn-success" onclick="groupPage.unbanUser(${v.user_id})">Разбанить</button>` : (v.can_be_kicked ? `<button class="btn btn-danger" onclick="groupPage.banUser(${v.user_id})">Забанить</button>` : '')}
                            </div>
                            </div>
                      </div>
                    </div>          
            `
        }).join("");
    }

}