//у каждой записи должно быть can_modify
const hierarchy = {
    entity: "user",
    list_fields: [
        {
            field: "username"
        }
    ],
    child: {
        entity: "group",
        primary: "group_id",
        list_fields: [
            {
                field: "name",
                fieldName: "Название",
            },
            {
                field: "members_in_group",
                fieldName: "Кол-во участников",
                ignore_in_edit: true
            }
        ],
        chilld: {
            entity: "subject",
            primary: "subject_id",
            list_fields: [
                {
                    field: "name",
                    fieldName: "Название",
                },
                {
                    field: "collections_count",
                    fieldName: "Кол-во коллекций",
                     ignore_in_edit: true
                }
            ],
            child: {
                entity: "collection",
                primary: "collection_id",
                list_fields: [
                    {
                        field: "name",
                        fieldName: "Название",
                    },
                    {
                        field: "tasks_count",
                        fieldName: "Кол-во заданий",
                        ignore_in_edit: true
                    }
                ],
                child: {
                    entity: "task",
                    primary: "task_id",
                    entity_fields: [
                        {
                            field: "name",
                            fieldName: "Название",
                        },
                        {
                            field: "description",
                            fieldName: "Описание",
                        },
                        {
                            field: "last_repeat_date",
                            fieldName: "Последняя дата повторения",
                            ignore_in_edit: true
                        },
                         {
                            field: "next_repeat_date",
                            fieldName: "Следующая дата повторения",
                            ignore_in_edit: true
                        },
                         {
                            field: "difficulty",
                            fieldName: "сложность",
                            ignore_in_edit: true
                        },
                    ],
                    list_fields: [
                        {
                            field: "name",
                            fieldName: "Название",
                        },
                        
                    ],
                    child: {
                        entity: "solution",
                        primary: "solution_id",
                        list_fields: [],
                        child: {
                            entity: "comment",
                            primary: "comment_id",
                            list_fields: [],
                        }
                    }
                }
            }
        }
    }
}