const exampleData = {
    entity_id: 1,
    name: "Test task",
    creator_name: "Vladislav",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mollis sapien at ex lacinia pulvinar. Phasellus eu ligula dolor. Sed tincidunt euismod odio sed consectetur. Integer tincidunt odio et laoreet tristique. Donec blandit lorem elit, id feugiat tortor iaculis eget. Integer sed lectus sed felis fringilla cursus a in libero. Donec porttitor lectus in bibendum sollicitudin. Integer commodo nisl ex, at condimentum lectus aliquet ut. Etiam tristique, risus quis semper iaculis, odio sem egestas sem, quis molestie magna ex eu mauris. Nullam id fringilla nisi, id pellentesque arcu. Duis nisl ex, tempor at finibus a, gravida quis lorem. Cras molestie felis nunc, nec auctor nibh maximus non.\n" +
        "\n" +
        "Donec tristique tellus felis, in vulputate arcu convallis vel. Nulla efficitur tempor urna eget tempor. Nullam tincidunt metus sed pellentesque feugiat. Etiam luctus et orci a laoreet. Cras fermentum neque tincidunt mauris feugiat, quis molestie eros blandit. Cras euismod libero vel felis euismod imperdiet. Ut a aliquam metus. Suspendisse lobortis elit nunc, in rutrum elit sodales a. Cras at nisi nulla. In vitae tempus eros, id elementum elit.\n" +
        "\n" +
        "Nam pretium sapien odio. Vivamus in tortor arcu. Nam odio turpis, eleifend eu vulputate id, eleifend ac purus. Maecenas vitae ex eu lacus accumsan tempus a a est. Vestibulum vulputate lorem accumsan ligula auctor ullamcorper. Maecenas aliquam finibus ullamcorper. Integer a feugiat purus, at interdum massa. Vivamus bibendum velit vel ex euismod, nec finibus turpis tincidunt. Phasellus hendrerit blandit mauris, at tempus ex vulputate vel. Ut gravida vel mauris non porta. Donec quis enim sed felis commodo pulvinar quis id nisl. Aenean sodales dignissim velit sed hendrerit. Duis tempus odio eget nunc volutpat efficitur.\n" +
        "\n" +
        "Mauris rhoncus sem lectus, vel facilisis elit posuere a. Curabitur faucibus lacus a quam gravida vestibulum. Donec in lectus tempus, ornare sapien ac, semper libero. Cras efficitur sollicitudin pulvinar. Nullam porttitor ex at massa ultrices tincidunt. Fusce vel justo sit amet metus gravida fermentum in nec felis. Pellentesque eleifend lobortis mi ac consectetur. Aliquam consequat mauris ac neque tincidunt lobortis. Curabitur pretium ante a turpis vulputate egestas. Proin non ipsum nulla. Nam dictum massa feugiat, viverra nisl ac, tincidunt risus. Etiam fermentum tincidunt dolor et lacinia. Phasellus sagittis velit a nisi vehicula iaculis. Vivamus vestibulum metus lacinia lorem pulvinar faucibus. Vestibulum non ultricies lorem. Aliquam erat volutpat.\n" +
        "\n" +
        "Quisque sagittis dolor et metus porta vestibulum. Nam a sapien tincidunt, vestibulum eros vitae, viverra turpis. Quisque finibus tortor id enim pharetra, non pretium orci tristique. Donec porta urna at libero dapibus, ac mattis nibh accumsan. Integer porta nunc vitae orci pellentesque pretium. Nam elementum malesuada massa in vehicula. Ut vestibulum id lectus ac interdum. Pellentesque congue dapibus lacus vitae elementum. Vestibulum maximus imperdiet ex, condimentum porttitor purus maximus vel. Aenean purus odio, dictum ut ex a, fermentum accumsan sapien.",
    can_modify: true,
    can_delete: true,
    solutions: [
        {
            entity_id: 1,
            can_delete: true,
            can_modify: true,
            solution: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mollis sapien at ex lacinia pulvinar. Phasellus eu ligula dolor. Sed tincidunt euismod odio sed consectetur. Integer tincidunt odio et laoreet tristique. Donec blandit lorem elit, id feugiat tortor iaculis eget. Integer sed lectus sed felis fringilla cursus a in libero. Donec porttitor lectus in bibendum sollicitudin. Integer commodo nisl ex, at condimentum lectus aliquet ut. Etiam tristique, risus quis semper iaculis, odio sem egestas sem, quis molestie magna ex eu mauris. Nullam id fringilla nisi, id pellentesque arcu. Duis nisl ex, tempor at finibus a, gravida quis lorem. Cras molestie felis nunc, nec auctor nibh maximus non.\n" +
                "\n" +
                "Donec tristique tellus felis, in vulputate arcu convallis vel. Nulla efficitur tempor urna eget tempor. Nullam tincidunt metus sed pellentesque feugiat. Etiam luctus et orci a laoreet. Cras fermentum neque tincidunt mauris feugiat, quis molestie eros blandit. Cras euismod libero vel felis euismod imperdiet. Ut a aliquam metus. Suspendisse lobortis elit nunc, in rutrum elit sodales a. Cras at nisi nulla. In vitae tempus eros, id elementum elit.\n" +
                "\n" +
                "Nam pretium sapien odio. Vivamus in tortor arcu. Nam odio turpis, eleifend eu vulputate id, eleifend ac purus. Maecenas vitae ex eu lacus accumsan tempus a a est. Vestibulum vulputate lorem accumsan ligula auctor ullamcorper. Maecenas aliquam finibus ullamcorper. Integer a feugiat purus, at interdum massa. Vivamus bibendum velit vel ex euismod, nec finibus turpis tincidunt. Phasellus hendrerit blandit mauris, at tempus ex vulputate vel. Ut gravida vel mauris non porta. Donec quis enim sed felis commodo pulvinar quis id nisl. Aenean sodales dignissim velit sed hendrerit. Duis tempus odio eget nunc volutpat efficitur.\n" +
                "\n" +
                "Mauris rhoncus sem lectus, vel facilisis elit posuere a. Curabitur faucibus lacus a quam gravida vestibulum. Donec in lectus tempus, ornare sapien ac, semper libero. Cras efficitur sollicitudin pulvinar. Nullam porttitor ex at massa ultrices tincidunt. Fusce vel justo sit amet metus gravida fermentum in nec felis. Pellentesque eleifend lobortis mi ac consectetur. Aliquam consequat mauris ac neque tincidunt lobortis. Curabitur pretium ante a turpis vulputate egestas. Proin non ipsum nulla. Nam dictum massa feugiat, viverra nisl ac, tincidunt risus. Etiam fermentum tincidunt dolor et lacinia. Phasellus sagittis velit a nisi vehicula iaculis. Vivamus vestibulum metus lacinia lorem pulvinar faucibus. Vestibulum non ultricies lorem. Aliquam erat volutpat.\n" +
                "\n" +
                "Quisque sagittis dolor et metus porta vestibulum. Nam a sapien tincidunt, vestibulum eros vitae, viverra turpis. Quisque finibus tortor id enim pharetra, non pretium orci tristique. Donec porta urna at libero dapibus, ac mattis nibh accumsan. Integer porta nunc vitae orci pellentesque pretium. Nam elementum malesuada massa in vehicula. Ut vestibulum id lectus ac interdum. Pellentesque congue dapibus lacus vitae elementum. Vestibulum maximus imperdiet ex, condimentum porttitor purus maximus vel. Aenean purus odio, dictum ut ex a, fermentum accumsan sapien.",
            creator_name: "Vladislav",
            comments: [
                {
                    entity_id: 1,
                    text: "Решение интересное и самое понятное ",
                    creator_name: "Vladislav",
                    can_modify: true,
                    can_delete: true,
                }
            ]
        }
    ]
}

class PlannerTaskPage {

    Task

    constructor(task_id) {
        console.log(task_id)
        sendAjax('getTask', {
            'task_id': task_id,
        }, 'POST', (t) => {
            this.Task = t;
            this.render()
        }, exampleData)

        window.TaskPage = this;
    }

    editTask(entity_id) {
        RenderModal('Редактировать задачу', [
            {
                field: "name",
                fieldName: "Название",
                type: "varchar",
                value: this.Task.name
            },
            {
                field: "description",
                fieldName: "Описание",
                type: "text",
                value: this.Task.description
            }
        ], "editTask", entity_id, null, (json, res) => {
            window.objectRegistry.updateName('tasks', entity_id, json['name']);

            for (let k in json) {
                this.Task[k] = json[k]
            }

            this.render();
        })
    }

    deleteTask(entity_id) {
        RenderModal('Удалить задачу?', [], "deleteTask", entity_id, null, (json, res) => {
            window.objectRegistry.remove('tasks', entity_id);
            $('#page-container').html('');
        })
    }

    addSolution(father_entity_id) {
        RenderModal('Добавить решение', [
            {
                field: "solution",
                fieldName: "Решение",
                type: "text",
            }
        ], "addSolution", null, father_entity_id, (json, res) => {

            let solution = {}
            for (let k in json) {
                solution[k] = json[k]
            }

            for (let k in res) {
                solution[k] = res[k]
            }

            solution.comments = []
            solution.creator_name = "Я";
            solution.can_modify = true;
            solution.can_delete = true;

            if (!this.Task.solutions) {
                this.Task.solutions = [];
            }
            this.Task.solutions.push(solution)

            this.render();
        })
    }

    updateSolution(entity_id) {
        let solution = this.Task.solutions.find((el) => el.entity_id == entity_id);
        RenderModal('Редактировать решение', [
            {
                field: "solution",
                fieldName: "Решение",
                type: "text",
                value: solution.solution
            }
        ], "editSolution", entity_id, null, (json, res) => {

            for (let k in json) {
                solution[k] = json[k]
            }

            this.render();
        })
    }

    deleteSolution(entity_id) {

        RenderModal('Удалить решение?', [], "deleteSolution", entity_id, null, (json, res) => {

            this.Task.solutions = this.Task.solutions.filter((v, i, a) => v.entity_id != entity_id);

            this.render();
        })
    }

    addComment(father_entity_id) {
        RenderModal('Добавить комментарий', [
            {
                field: "text",
                fieldName: "Текст",
                type: "text",
            }
        ], "addComment", null, father_entity_id, (json, res) => {

            let comment = {}
            for (let k in json) {
                comment[k] = json[k]
            }

            for (let k in res) {
                comment[k] = res[k]
            }

            comment.creator_name = "Я";
            comment.can_modify = true;
            comment.can_delete = true;

            let solution = this.Task.solutions.find((v, i, a) => v.entity_id == father_entity_id);
            if (solution && !solution.comments) {
                solution.comments = [];
            }

            if (solution) {
                solution.comments.push(comment)
            }

            this.render();
        })
    }

    updateComment(entity_id) {

        let comment = null;
        for (let solution of this.Task.solutions) {
            comment = solution.comments.find((v, i, a) => v.entity_id == entity_id);

            if (comment) break;
        }

        RenderModal('Редактировать комментарий', [
            {
                field: "text",
                fieldName: "Текст",
                type: "text",
                value: comment.text
            }
        ], "editComment", entity_id, null, (json, res) => {

            for (let k in json) {
                comment[k] = json[k]
            }

            this.render();
        })
    }

    deleteComment(entity_id) {
        RenderModal('Удалить комментарий?', [], "deleteComment", entity_id, null, (json, res) => {

            for (let solution of this.Task.solutions) {
                solution.comments = solution.comments.filter((v, i, a) => v.entity_id != entity_id);
            }

            this.render();
        })
    }


    render() {

        let html = `
                    <div class="row">
                        <div class="col-12 col-lg-3 col-xl-2">
                            <div class="card">
                                <div class="card-body">
                                    <h5>${this.Task.creator_name}</h5>
                                    ${this.Task.can_modify ? `<button class="btn btn-info btn-sm" onclick="window.TaskPage.editTask(${this.Task.entity_id})">Редактировать</button>` : ''}
                                    ${this.Task.can_delete ? `<button class="btn btn-danger mt-lg-3 btn-sm"  onclick="window.TaskPage.deleteTask(${this.Task.entity_id})">Удалить</button>` : ''}
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-12 col-lg-9 col-xl-10">
                             <div class="card">
                                 <div class="card-body">
                                     <h1>${this.Task.name}</h1>
                                    <h3>Описание задачи</h3>
                                     <div  style="white-space: pre-line">
                                        <p>${this.Task.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
            </div>
            <h3 class="mt-3">Решения <button class="btn btn-primary" onclick="window.TaskPage.addSolution(${this.Task.entity_id})">+</button></h3>
            ${this.Task.solutions ? this.Task.solutions.map((v, i, a) => {
            return this._renderSolution(v)
        }).join("") : ""}
            `
        $('#page-container').html(html);
    }

    _renderSolution(solution) {
        return `<div class="row">
                <div class="col-12 col-lg-3 col-xl-2">
                    <div class="card">
                        <div class="card-body">
                            <h5>${solution.creator_name}</h5>
                            ${solution.can_modify ? `<button class="btn btn-info btn-sm" onclick="window.TaskPage.updateSolution(${solution.entity_id})">Редактировать</button>` : ''}
                            ${solution.can_delete ? `<button class="btn btn-danger mt-lg-3 btn-sm" onclick="window.TaskPage.deleteSolution(${solution.entity_id})">Удалить</button>` : ''}
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-9 col-xl-10">
                    <div class="card">
                        <div class="card-body" style="white-space: pre-line">
                            <p>${solution.solution}</p>
                        </div>
                    </div>
                    <p class="mt-3">Комментарии <button class="btn btn-primary" onclick="window.TaskPage.addComment(${solution.entity_id})">+</button></p>
                    <div class="card">
                        ${solution.comments ? solution.comments.map((v, i, a) => {
            return this._renderComment(v)
        }).join("") : ""}
                    </div>
                </div>
            </div>`
    }

    _renderComment(comment) {
        return `<div class="card">
                        <div class="card-body">
                            <p style="margin-bottom: 5px">${comment.creator_name}  
                            ${comment.can_modify ? `<button class="btn btn-info btn-sm" onclick="window.TaskPage.updateComment(${comment.entity_id})">Редактировать</button>` : ''}
                            ${comment.can_delete ? `<button class="btn btn-danger btn-sm" onclick="window.TaskPage.deleteComment(${comment.entity_id})">Удалить</button>` : ''}:</p>  
                            <p class="mb-0" style="font-size: 0.8em">${comment.text}</p>
                        </div>
                    </div>`
    }


}