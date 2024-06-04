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
                task: [
                    { id: "T1", name: 'Task 1', completed: true, weight: 20, type: "Required", from: '2023-06-01T10:00', to: '2023-12-31T18:00', link: "https://shorturl.at/uJl78" },
                    { id: "T2", name: 'Task 2', completed: false, weight: 20, type: "Required", from: '2023-06-01T10:00', to: '2023-12-01T18:00', link: "https://shorturl.at/uJl78" },
                    { id: "T3", name: 'Task 3', completed: false, weight: 20, type: "Required", from: '2023-10-01T10:00', to: '2024-12-31T18:00', link: "https://shorturl.at/uJl78" },
                    { id: "T4", name: 'Task 4', completed: true, weight: 20, type: "Required", from: '2023-06-01T10:00', to: '2023-12-31T18:00', link: "https://shorturl.at/uJl78" },
                    { id: "T5", name: 'Task 5', completed: false, weight: 20, type: "Required", from: '2023-06-01T10:00', to: '2024-06-01T18:00', link: "https://shorturl.at/uJl78" },
                    { id: "T6", name: 'Task 6', completed: true, weight: 20, type: "Optional", from: '2023-06-01T10:00', to: '2024-12-31T18:00', link: "https://shorturl.at/uJl78" },
                    { id: "T7", name: 'Task 7', completed: false, weight: 20, type: "Optional", from: '2023-06-01T10:00', to: '2023-12-31T18:00', link: "https://shorturl.at/uJl78" },
                ],
            },
            {
                id: "K2",
                name: 'KPI 2',
                completed: true,
                score: 110,
                numberOfOptionalsToDo: 1,
                task: [
                    { id: "T1", name: 'Task 1', completed: true, weight: 20, type: "Required", from: '2023-06-01T10:00', to: '2023-12-31T18:00', link: "https://shorturl.at/uJl78" },
                    { id: "T2", name: 'Task 2', completed: true, weight: 20, type: "Required", from: '2023-06-01T10:00', to: '2023-12-31T18:00', link: "https://shorturl.at/uJl78" },
                    { id: "T3", name: 'Task 3', completed: true, weight: 20, type: "Required", from: '2023-06-01T10:00', to: '2023-12-31T18:00', link: "https://shorturl.at/uJl78" },
                    { id: "T4", name: 'Task 4', completed: true, weight: 20, type: "Required", from: '2023-06-01T10:00', to: '2023-12-31T18:00', link: "https://shorturl.at/uJl78" },
                    { id: "T5", name: 'Task 5', completed: true, weight: 20, type: "Required", from: '2023-06-01T10:00', to: '2023-12-31T18:00', link: "https://shorturl.at/uJl78" },
                    { id: "T6", name: 'Task 6', completed: true, weight: 20, type: "Optional", from: '2023-06-01T10:00', to: '2023-12-31T18:00', link: "https://shorturl.at/uJl78" },
                    { id: "T7", name: 'Task 7', completed: false, weight: 20, type: "Optional", from: '2023-06-01T10:00', to: '2023-12-31T18:00', link: "https://shorturl.at/uJl78" },
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