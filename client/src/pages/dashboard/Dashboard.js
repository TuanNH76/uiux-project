import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import TaskChart from '../../components/TaskChart';
import '../../App.css'

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Typography variant="h4" className="dashboard-title">
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper className="dashboard-paper">
            <Typography variant="h6">Task Completed</Typography>
            <Typography variant="h4">8</Typography>
            <Typography color="textSecondary">10+ more from last week</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className="dashboard-paper">
            <Typography variant="h6">New Task</Typography>
            <Typography variant="h4">10</Typography>
            <Typography color="textSecondary">10+ more from last week</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className="dashboard-paper">
            <Typography variant="h6">Goal Done</Typography>
            <Typography variant="h4">10</Typography>
            <Typography color="textSecondary">8+ more from last week</Typography>
          </Paper>
        </Grid>
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
