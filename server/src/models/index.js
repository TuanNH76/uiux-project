const mongoose = require('mongoose');
const Goal = require('./goal');

mongoose.connect('mongodb+srv://juny76:tuan762003@cluster0.q4mt3pd.mongodb.net/?retryWrites=true&w=majority', {
    dbName : 'uiux',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to MongoDB");
});

module.exports = {
    KPI: require('./kpi'),
    Task: require('./task'),
    Evaluation: require('./evaluation'),
    Goal : require('./goal')
};
