import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

<Sidebar>
  <Menu>
  <MenuItem component={<Link to="/" />}> Dashboard</MenuItem>
    <MenuItem component={<Link to="/tracking" />}> Tracking</MenuItem>
    <MenuItem component={<Link to="/kpi" />}> KPI</MenuItem>
    <MenuItem component={<Link to="/task" />}> Task</MenuItem>
    <MenuItem component={<Link to="/schedule" />}> Schedule</MenuItem>
    <MenuItem component={<Link to="/goal" />}> Goal</MenuItem>
    <MenuItem component={<Link to="/setting" />}> Setting</MenuItem>



  </Menu>
</Sidebar>;