const exampleData = {
    groups: [
        {
            entity_id: 1,
            name: "Тестовая группа",
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

const IS_TESTING = true;


class HierarchyPlanView {

}