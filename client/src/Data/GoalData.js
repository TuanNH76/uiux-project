export const goalData = [
    {
        id: 1,
        title: 'Goal 1',
        from: '2023-06-01T10:00',
        to: '2023-12-31T18:00',
        role: 'Developer',
        description: 'Complete the project',
        kpis: [
            { id: 1, name: 'KPI 1', completed: true },
            { id: 2, name: 'KPI 2', completed: false },
            { id: 3, name: 'KPI 3', completed: true },
        ],
    },
    {
        id: 2,
        title: 'Goal 2',
        from: '2023-07-01T10:00',
        to: '2023-11-30T18:00',
        role: 'Designer',
        description: 'Design the new UI',
        kpis: [
            { id: 1, name: 'KPI 1', completed: true },
            { id: 2, name: 'KPI 2', completed: true },
        ],
    },
    // Thêm các mục goal khác nếu cần
];