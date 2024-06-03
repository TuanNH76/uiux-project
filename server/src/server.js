import express from 'express';
import { connect, Schema, model } from 'mongoose';
import { json } from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());

connect('mongodb://localhost:27017/kpi_management', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(json());

require('./models'); // Khởi tạo kết nối MongoDB và load các models

app.use('/kpis', kpiRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
