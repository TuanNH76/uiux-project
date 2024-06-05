// KPI: To-do KPI, Quantity KPI, Weighted KPI
export const KPI_TYPE = {
    TODO_KPI: "To-do",
    QUANTITY_KPI: "Quantity",
    WEIGHTED_KPI: "Weighted"
}
export const goalData = [
    {
        id: "G1",
        title: 'Goal 1',
        from: '2023-06-01T10:00',
        to: '2023-12-31T18:00',
        role: 'Developer',
        description: 'Complete the project',
        kpis: [
            {
                id: "K1",
                name: 'KPI 1',
                completed: false,
                score: 10,
                from: '2023-06-01T10:00',
                to: '2023-12-31T18:00',
                numberOfOptionalsToDo: 1,
                typeKPI: KPI_TYPE.TODO_KPI,
                task: [
                    { id: "T1", name: 'Task 1', completed: true, type: "Required", from: '2023-06-01T10:00', to: '2023-12-31T18:00', link: "https://shorturl.at/uJl78" },
                    { id: "T2", name: 'Task 2', completed: false, type: "Required", from: '2023-06-01T10:00', to: '2023-12-01T18:00', link: "https://shorturl.at/uJl78" },
                    { id: "T3", name: 'Task 3', completed: false, type: "Required", from: '2023-10-01T10:00', to: '2024-12-31T18:00', link: "https://shorturl.at/uJl78" },
                    { id: "T4", name: 'Task 4', completed: true, type: "Required", from: '2023-06-01T10:00', to: '2023-12-31T18:00', link: "https://shorturl.at/uJl78" },
                    { id: "T5", name: 'Task 5', completed: false, type: "Required", from: '2023-06-01T10:00', to: '2024-06-01T18:00', link: "https://shorturl.at/uJl78" },
                    { id: "T6", name: 'Task 6', completed: true, type: "Optional", from: '2023-06-01T10:00', to: '2024-12-31T18:00', link: "https://shorturl.at/uJl78" },
                    { id: "T7", name: 'Task 7', completed: false, type: "Optional", from: '2023-06-01T10:00', to: '2023-12-31T18:00', link: "https://shorturl.at/uJl78" },
                ],
            },
            {
                id: "K2",
                name: 'KPI 2',
                completed: false,
                score: 25,
                from: '2023-06-01T10:00',
                to: '2023-12-31T18:00',
                target: 1000,
                unit: "word",
                duration: "1M",
                split: "W",
                typeKPI: KPI_TYPE.QUANTITY_KPI,
                task: [
                    { id: "W1", name: 'Week 1', quantity: 250, completed: false, type: "Required", from: '2024-06-01T00:00', to: '2024-06-04T00:00', link: "https://shorturl.at/uJl78" },
                    { id: "W2", name: 'Week 2', quantity: 250, completed: true, type: "Required", from: '2024-06-07T00:00', to: '2024-06-14T00:00', link: "https://shorturl.at/uJl78" },
                    { id: "W3", name: 'Week 3', quantity: 250, completed: false, type: "Required", from: '2024-06-15T00:00', to: '2024-06-21T00:00', link: "https://shorturl.at/uJl78" },
                    { id: "W4", name: 'Week 4', quantity: 250, completed: false, type: "Required", from: '2024-06-22T00:00', to: '2024-06-30T00:00', link: "https://shorturl.at/uJl78" },
                ],
            },
            {
                id: "K3",
                name: 'KPI 3',
                completed: false,
                score: 25,
                from: '2023-06-01T10:00',
                to: '2023-12-31T18:00',
                typeKPI: KPI_TYPE.WEIGHTED_KPI,
                task: [
                    { id: "T4", name: 'Task 4', weight: 10, completed: false, type: "Required", from: '2024-06-22T00:00', to: '2024-06-30T00:00', link: "https://shorturl.at/uJl78" },
                    { id: "T1", name: 'Task 1', weight: 50, completed: false, type: "Required", from: '2024-06-01T00:00', to: '2024-06-04T00:00', link: "https://shorturl.at/uJl78" },
                    { id: "T2", name: 'Task 2', weight: 30, completed: true, type: "Required", from: '2024-06-07T00:00', to: '2024-06-14T00:00', link: "https://shorturl.at/uJl78" },
                    { id: "T3", name: 'Task 3', weight: 10, completed: false, type: "Required", from: '2024-06-15T00:00', to: '2024-06-21T00:00', link: "https://shorturl.at/uJl78" },
                ],
            },
        ]
    },
    {
        id: "G2",
        title: 'Goal 2',
        from: '2023-07-01T10:00',
        to: '2023-11-30T18:00',
        role: 'Designer',
        description: 'Design the new UI',
        kpis: [
            { id: "K3", name: 'KPI 1', completed: true },
            { id: "K4", name: 'KPI 2', completed: true },
        ],
    },
    // Thêm các mục goal khác nếu cần
];