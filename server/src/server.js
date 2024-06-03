const express = require('express');
const bodyParser = require('body-parser');
const kpiRoutes = require('./routes/kpi');
const goalRoutes = require('./routes/goal');
const taskRoutes = require('./routes/task');
const evaluationRoutes = require('./routes/evaluation');

const app = express();
app.use(bodyParser.json());

require('./models'); // Khởi tạo kết nối MongoDB và load các models

app.use('/kpis', kpiRoutes);
app.use('/goals', goalRoutes);
app.use('/tasks', taskRoutes);
app.use('/evaluations', evaluationRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
