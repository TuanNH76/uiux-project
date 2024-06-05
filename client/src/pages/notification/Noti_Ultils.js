export const getOverdueAndUpcomingTasks = (goals) => {
    const overdueTasks = [];
    const upcomingTasks = [];
    const currentDate = new Date();
    const threeDaysLater = new Date();
    threeDaysLater.setDate(currentDate.getDate() + 3);

    goals.forEach(goal => {
        goal.kpis?.forEach(kpi => {
            kpi.task?.forEach(task => {
                const taskEndDate = new Date(task.to);
                if (taskEndDate < currentDate) {
                    overdueTasks.push(task);
                } else if (taskEndDate <= threeDaysLater) {
                    upcomingTasks.push(task);
                }
            });
        });
    });

    return { overdueTasks, upcomingTasks };
};
