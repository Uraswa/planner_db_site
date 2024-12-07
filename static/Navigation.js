class ObjectRegistry {

    objects = {
        groups: [
            {
                entity_id: 1,
                name: "Тестовая группа",
                invitation_link: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                can_modify: true,
                can_delete: true,
                subjects: [
                    {
                        entity_id: 1,
                        name: "Тестовый предмет",
                        can_modify: true,
                        can_delete: true,
                        collections: [
                            {
                                entity_id: 1,
                                name: "Коллекция",
                                can_modify: true,
                                can_delete: true,
                                is_subscribed: false,
                                tasks: [
                                    {
                                        entity_id: 1,
                                        name: "Задача1",
                                        description: "Описание",
                                        can_modify: true,
                                        can_delete: true
                                    }
                                ]
                            }
                        ]
                    }
                ]

            }
        ]
    }

    constructor(objs) {
        if (objs) {
            this.objects = objs;
        }
    }

    addObject(find_key, item) {
        this._addObject(this.objects, find_key, item);
        this.render()
    }

    _addObject(obj, find_key, obj2add) {

        for (let key in obj) {

            if (key == find_key) {
                if (obj.entity_id == obj2add.father_entity_id) {
                    if (!obj[key]) obj[key] = [];
                    obj[key].push(obj2add)
                    return;
                }
            } else if (Array.isArray(obj[key])) {
                for (let item of obj[key]) {
                    this._addObject(item, find_key, obj2add)
                }
            }
        }
    }

    updateName(find_key, entity_id, name) {
        this.updateItem(find_key, entity_id, (i) => i.name = name);
    }

    updateItem(find_key, entity_id, callback, rerender = true) {
        let item = this.getItem(find_key, entity_id)

        if (item) {
            callback(item)
            if (rerender) this.render()
        }
    }

    getItem(find_key, entity_id) {
        return this._getItem(this.objects, find_key, entity_id)
    }

    _getItem(obj, find_key, entity_id) {

        for (let key in obj) {

            if (key == find_key && obj[key]) {

                for (let item of obj[key]) {
                    if (item.entity_id == entity_id) return item;
                }
            } else if (Array.isArray(obj[key])) {
                for (let item of obj[key]) {

                    let rs = this._getItem(item, find_key, entity_id)
                    if (rs) return rs;
                }
            }
        }
    }

    remove(find_key, entity_id) {
        let view = this;
        this._remove(view.objects, find_key, entity_id);
        this.render();
    }

    _remove(obj, find_key, entity_id) {

        for (let key in obj) {
            if (key == find_key) {
                if (!obj[key]) return;
                obj[key] = obj[key].filter((v, i, a) => v.entity_id != entity_id)
                return;
            } else if (Array.isArray(obj[key])) {
                for (let item of obj[key]) {
                    this._remove(item, find_key, entity_id)
                }
            }
        }
    }


    getGroupPage(entity_id) {
        let entity = this.getItem('groups', entity_id);
        if (!entity) return;
        let page = new PlannerGroupPage(entity);
    }

    copyGroupInvitationLink(entity_id) {
        let entity = this.getItem('groups', entity_id);
        if (!entity) return;

        navigator.clipboard.writeText(location.origin + "/join_group?group=" + entity.invite_link);
        alert('Текст скопирован!')
    }

    quitGroup(entity_id) {
        let entity = this.getItem('groups', entity_id);
        if (!entity) return;

        if (!confirm("Вы уверены?")) return;

        sendAjax("quitGroup", {
            "entity_id": entity_id
        }, 'POST', (d) => {

            if (d.success) {
                this.remove('groups', entity_id)
            }
        }, {
            'success': true
        })
    }

    addGroup() {
        RenderModal('Добавить группу', [
            {
                field: "name",
                fieldName: "Название",
                type: "varchar",
            },
        ], "addGroup", null, null, (json, res) => {
            let entity = {
                'group_type': 'default'
            };

            for (let k in json) {
                entity[k] = json[k]
            }

            for (let k in res) {
                entity[k] = res[k]
            }

            entity.subjects = [];
            entity.can_modify = true;
            entity.can_delete = true;

            objectRegistry.addObject('groups', entity);
        })
    }

    editGroup(entity_id) {
        let entity = this.getItem('groups', entity_id);
        if (!entity) return;
        RenderModal('Редактировать группу', [
            {
                field: "name",
                fieldName: "Название",
                type: "varchar",
                value: entity.name
            },
        ], "editGroup", entity_id, null, (json, res) => {
            for (let k in json) {
                entity[k] = json[k]
            }

            for (let k in res) {
                entity[k] = res[k]
            }

            this.render()
        })
    }

    deleteGroup(entity_id) {
        RenderModal('Удалить группу?', [], "deleteGroup", entity_id, null, (json, res) => {
            window.objectRegistry.remove('groups', entity_id);
        })
    }

    addSubject(father_entity_id) {
        RenderModal('Добавить предмета', [
            {
                field: "name",
                fieldName: "Название",
                type: "varchar",
            },
        ], "addSubject", null, father_entity_id, (json, res) => {
            let entity = {};

            for (let k in json) {
                entity[k] = json[k]
            }

            for (let k in res) {
                entity[k] = res[k]
            }


            entity.collections = [];
            entity.can_modify = true;
            entity.can_delete = true;

            console.log(entity)

            objectRegistry.addObject('subjects', entity);
        })
    }

    editSubject(entity_id) {
        let entity = this.getItem('subjects', entity_id);
        if (!entity) return;
        RenderModal('Редактировать предмет', [
            {
                field: "name",
                fieldName: "Название",
                type: "varchar",
                value: entity.name
            },
        ], "editSubject", entity_id, null, (json, res) => {
            for (let k in json) {
                entity[k] = json[k]
            }

            for (let k in res) {
                entity[k] = res[k]
            }

            this.render()
        })
    }

    deleteSubject(entity_id) {
        RenderModal('Удалить предмет?', [], "deleteSubject", entity_id, null, (json, res) => {
            window.objectRegistry.remove('subjects', entity_id);
        })
    }

    addCollection(father_entity_id) {
        RenderModal('Добавить коллекцию', [
            {
                field: "name",
                fieldName: "Название",
                type: "varchar",
            },
        ], "addCollection", null, father_entity_id, (json, res) => {
            let entity = {};

            for (let k in json) {
                entity[k] = json[k]
            }

            for (let k in res) {
                entity[k] = res[k]
            }


            entity.tasks = [];
            entity.can_modify = true;
            entity.can_delete = true;

            console.log(entity)

            objectRegistry.addObject('collections', entity);
        })
    }

    editCollection(entity_id) {
        let entity = this.getItem('collections', entity_id);
        if (!entity) return;
        RenderModal('Редактировать предмет', [
            {
                field: "name",
                fieldName: "Название",
                type: "varchar",
                value: entity.name
            },
        ], "editCollection", entity_id, null, (json, res) => {

            for (let k in json) {
                entity[k] = json[k]
            }

            for (let k in res) {
                entity[k] = res[k]
            }

            this.render()
        })
    }

    subscribeCollection(entity_id) {

        let entity = this.getItem('collections', entity_id);
        if (!entity) return;

        sendAjax("subscribeCollection", {
            "collection_id": entity_id
        }, 'POST', (d) => {
            console.log(d)
            if (d.success) {
                entity.is_subscribed = true;
                this.render()
            }
        }, {
            'success': true
        })
    }

    unsubscribeCollection(entity_id) {
        let entity = this.getItem('collections', entity_id);
        if (!entity) return;

        sendAjax("unsubscribeCollection", {
            "collection_id": entity_id
        }, 'POST', (d) => {
            if (d.success) {
                entity.is_subscribed = false;
                this.render()
            }
        }, {
            'success': true
        })
    }

    deleteCollection(entity_id) {
        RenderModal('Удалить коллекцию?', [], "deleteCollection", entity_id, null, (json, res) => {
            window.objectRegistry.remove('collections', entity_id);
        })
    }

    addTask(father_entity_id) {
        RenderModal('Добавить задачу', [
            {
                field: "name",
                fieldName: "Название",
                type: "varchar",
            },
            {
                field: "description",
                fieldName: "Описание",
                type: "text",
            },
        ], "addTask", null, father_entity_id, (json, res) => {
            let entity = {};

            for (let k in json) {
                entity[k] = json[k]
            }

            for (let k in res) {
                entity[k] = res[k]
            }


            entity.solutions = [];
            entity.can_modify = true;
            entity.can_delete = true;

            console.log(entity)

            objectRegistry.addObject('tasks', entity);
        })
    }

    openTaskPage(task_id) {
        let page = new PlannerTaskPage(task_id);
    }

    render() {

        let html = `<nav class="acnav" role="navigation">
                    
                    <ul class="acnav__list acnav__list--level1">

                         ${this._renderGroups()}
                    </ul>
                   
                </nav>`

        $('#nav-container').html(html);
    }

    _renderGroups() {
        return this.objects.groups.map((v, i, a) => {

            let groupName = `<div style="display: flex; align-items: center">
                                    ${v.name}
                                </div>
                                <div class="dropdown ">
                                    <button class="btn btn-light dropdown-toggle " type="button" data-toggle="dropdown"
                                            aria-expanded="false">

                                    </button>
                                    <div class="dropdown-menu dropdown-menu-right">
                                        <div class="dropdown-item" onclick="objectRegistry.addSubject(${v.entity_id})">Добавить предмет</div>
                                        <div class="dropdown-item" onclick="objectRegistry.getGroupPage(${v.entity_id})">Подробнее</div>
                                        ${v.group_type === 'default' ? `<div class="dropdown-item" onclick="objectRegistry.copyGroupInvitationLink(${v.entity_id})">Копировать ссылку</div>` : ''}
                                        ${v.name === 'Общая' || v.name === 'Личная' ? '' : `<div class="dropdown-item" onclick="objectRegistry.quitGroup(${v.entity_id})">Выйти из группы</div>`}
                                        ${v.name === 'Общая' || v.name === 'Личная' || !v.can_modify ? '' : `<div class="dropdown-item" onclick="objectRegistry.editGroup(${v.entity_id})">Редактировать</div>`}
                                        ${v.name === 'Общая' || v.name === 'Личная' || !v.can_delete ? '' : `<div class="dropdown-item" onclick="objectRegistry.deleteGroup(${v.entity_id})">Удалить</div>`}
                                     </div>
                                </div>`

            if (!v.subjects || v.subjects.length === 0) {
                return `<li>
                             <span class="acnav__link acnav__link--level2" >${groupName}</span>
                         </li>`
            } else if (v.subjects && v.subjects.length !== 0) {
                return ` <li class="has-children ${v.is_open ? 'is-open' : ''}">
                            <div class="acnav__label" key="groups" entity_id="${v.entity_id}">
                                ${groupName}                             
                            </div> 
                            <ul class="acnav__list acnav__list--level2">
                                ${this._renderSubjects(v)}
                            </ul>
                        </li>`
            }

        }).join("")
    }

    _renderSubjects(group) {
        return group.subjects.map((v, i, a) => {

            let subjectListItem = `<div style="display: flex; align-items: center">
                                            ${v.name}
                                        </div>
                                        <div class="dropdown ">
                                            <button class="btn btn-light dropdown-toggle " type="button"
                                                    data-toggle="dropdown"
                                                    aria-expanded="false">

                                            </button>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <div class="dropdown-item" onclick="objectRegistry.addCollection(${v.entity_id})">Добавить коллекцию</div>
                                                ${!v.can_modify ? '' : `<div class="dropdown-item" onclick="objectRegistry.editSubject(${v.entity_id})">Редактировать</div>`}
                                                ${!v.can_delete ? '' : `<div class="dropdown-item" onclick="objectRegistry.deleteSubject(${v.entity_id})">Удалить</div>`}
                                                
                                            </div>
                                        </div>`
            if (!v.collections || v.collections.length === 0) {
                return `<li><span class="acnav__link acnav__link--level2" >${subjectListItem}</span></li>`
            }

            return `<li class="has-children" ${v.is_open ? 'is-open' : ''}">
                       <div class="acnav__label acnav__label--level2" key="subjects" entity_id="${v.entity_id}">
                            ${subjectListItem}
                        </div>
                         <ul class="acnav__list acnav__list--level3">
                                ${this._renderCollections(v)}
                         </ul>
                    </li>`

        }).join("")
    }

    _renderCollections(subject) {
        return subject.collections.map((v, i, a) => {
            let collectionListItem = `<div style="display: flex; align-items: center">
                                                     ${v.name}
                                                </div>
                                                 <div class="dropdown ">
                                                     <button class="btn btn-light dropdown-toggle " type="button"
                                                             data-toggle="dropdown"
                                                             aria-expanded="false">
                                                     </button>
                                                     <div class="dropdown-menu dropdown-menu-right">
                                                         ${v.is_subscribed ? `
                                                            <div class="dropdown-item" onclick="objectRegistry.unsubscribeCollection(${v.entity_id})">Отписаться</div>`
                : `<div class="dropdown-item" onclick="objectRegistry.subscribeCollection(${v.entity_id})">Подписаться</div>`
            }
                                                         <div class="dropdown-item" onclick="objectRegistry.addTask(${v.entity_id})">Добавить задание</div>
                                                         <div class="dropdown-item" onclick="objectRegistry.editCollection(${v.entity_id})">Редактировать</div>
                                                         <div class="dropdown-item" onclick="objectRegistry.deleteCollection(${v.entity_id})">Удалить</div>
                                                    </div>
                                                </div>`;

            if (!v.tasks || v.tasks.length === 0) {
                return `<li>
                               <span class="acnav__link acnav__link--level3">${collectionListItem}</span>
                          </li>`
            }

            return `<li class="has-children" ${v.is_open ? 'is-open' : ''}">
                       <div class="acnav__label acnav__label--level3" key="collections" entity_id="${v.entity_id}">
                            ${collectionListItem}
                        </div>
                         <ul class="acnav__list acnav__list--level4">
                                ${this._renderTasks(v)}
                         </ul>
                    </li>`


        }).join("")
    }

    _renderTasks(collection) {
        return collection.tasks.map((v, i, a) => {
            return `<li>
                               <span class="acnav__link acnav__link--level4" onclick="objectRegistry.openTaskPage(${v.entity_id})">${v.name}</span>
                          </li>`
        }).join("")
    }

}