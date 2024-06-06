import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Button, List, ListItem, ListItemText, IconButton, Checkbox } from '@mui/material';
import TaskChart from '../../components/TaskChart';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import './style.css';

const KPI_TYPE = {
  TODO_KPI: "To-do",
  QUANTITY_KPI: "Quantity",
  WEIGHTED_KPI: "Weighted"
};

const getMonthDays = (date) => {
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const monthDays = [];
  for (let i = 1; i <= daysInMonth; i++) {
    monthDays.push(new Date(date.getFullYear(), date.getMonth(), i));
  }
  return monthDays;
};

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [goalData, setGoalData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem('goalData');
    if (storedData) {
      setGoalData(JSON.parse(storedData));
    } else {
      setGoalData([]);
    }
  }, []);

  useEffect(() => {
    const selectedTasks = goalData.flatMap(goal =>
      goal.kpis.flatMap(kpi =>
        kpi.task?.filter(task => {
          const from = new Date(task.from);
          const to = new Date(task.to);
          return (
            !task.completed &&
            from <= selectedDate &&
            to >= selectedDate
          );
        }).map(task => ({ ...task, kpiName: kpi.name, goalName: goal.title })) || []
      )
    ).sort((a, b) => new Date(a.from) - new Date(b.from));
    setTasks(selectedTasks);
  }, [selectedDate, goalData]);

  const handlePrevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  const handleTaskToggle = (taskId) => {
    const updatedGoalData = goalData.map(goal => ({
      ...goal,
      kpis: goal.kpis.map(kpi => ({
        ...kpi,
        task: kpi.task?.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        ) || []
      }))
    }));
    setGoalData(updatedGoalData);
    localStorage.setItem('goalData', JSON.stringify(updatedGoalData));
  };

  const monthDays = getMonthDays(selectedDate);
  const rows = [];
  for (let i = 0; i < monthDays.length; i += 7) {
    rows.push(monthDays.slice(i, i + 7));
  }

  const hasTaskOnDay = (day) => {
    return goalData.some(goal =>
      goal.kpis.some(kpi =>
        kpi.task?.some(task => {
          const from = new Date(task.from);
          const to = new Date(task.to);
          return (
            !task.completed &&
            from <= day &&
            to >= day
          );
        })
      )
    );
  };

  return (
    <div className="dashboard">
      <Typography variant="h4" className="dashboard-title">
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}> {/* Adjusted the width of the month selector */}
          <Paper className="dashboard-paper">
            <div className="month-navigation">
              <IconButton onClick={handlePrevMonth}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h6" className="month-display">
                {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </Typography>
              <IconButton onClick={handleNextMonth}>
                <ArrowForward />
              </IconButton>
            </div>
            <div className="month-days">
              {rows.map((week, index) => (
                <div key={index} className="week-row">
                  {week.map(day => (
                    <Button
                      key={day.toDateString()}
                      variant={day.toDateString() === selectedDate.toDateString() ? 'contained' : 'text'}
                      onClick={() => setSelectedDate(day)}
                    >
                      {day.getDate()}
                      {hasTaskOnDay(day) && <div className="task-indicator"></div>}
                    </Button>
                  ))}
                </div>
              ))}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}> {/* Adjusted the width of the task list */}
          <Paper className="dashboard-paper">
            <Typography variant="h6">Tasks for {selectedDate.toDateString()}</Typography>
            <List>
              {tasks.length > 0 ? (
                tasks.map(task => (
                  <ListItem key={task.id}>
                    <Checkbox
                      checked={task.completed}
                      onChange={() => handleTaskToggle(task.id)}
                    />
                    <ListItemText
                      primary={task.name}
                      secondary={
                        <>
                          <Typography component="span">Time: {new Date(task.from).toLocaleTimeString()} - {new Date(task.to).toLocaleTimeString()}</Typography>
                          <Typography component="span">KPI: {task.kpiName}</Typography>
                          <Typography component="span">Goal: {task.goalName}</Typography>
                        </>
                      }
                    />
                    <Button
                      variant="outlined"
                      sx={{ color: '#5051F9', borderColor: '#5051F9' }}
                      href={task.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link
                    </Button>
                  </ListItem>
                ))
              ) : (
                <Typography>No tasks for this day</Typography>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ marginTop: '40px' }}>
        <Grid item xs={12}>
          <Paper className="dashboard-paper">
            <TaskChart />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;