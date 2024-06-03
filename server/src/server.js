const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors middleware

const kpiRoutes = require('./routes/kpi');
const goalRoutes = require('./routes/goal');
const taskRoutes = require('./routes/task');
const evaluationRoutes = require('./routes/evaluation');

const app = express();
app.use(bodyParser.json());
app.use(cors());

require('./models'); // Khởi tạo kết nối MongoDB và load các models

app.use('/api/kpis', kpiRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/evaluations', evaluationRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
