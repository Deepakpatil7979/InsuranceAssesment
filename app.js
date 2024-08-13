const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');
const multer = require('multer');
const uploadRoutes = require('./routes/uploadRoutes');
const policyRoutes = require('./routes/policyRoutes');
const messageRoutes = require('./routes/messageRoutes');
const monitorCPU = require('./utils/cpuMonitor');

const app = express();
app.use(express.json());


app.set("view engine", "hbs");
app.set("views", "view");
app.use(express.static(__dirname + "/public"));
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



app.use(express.static(path.join(__dirname, 'public')));

const upload = multer({ dest: path.join(__dirname, 'uploads/') });

mongoose.connect('mongodb://localhost:27017/insurance', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));


app.use('/api/upload', uploadRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api/messages', messageRoutes);

setInterval(() => {
    const cpuUsage = monitorCPU();
    console.log(`CPU Usage: ${cpuUsage}%`);
    if (cpuUsage > 70) {
        console.log('CPU usage is above 70%. Restarting the server...');
        process.exit(1); 
    }
}, 5000); 

app.get('/', (req, res) => {

    console.log("connected to ui");
    res.render('upload');
});



module.exports = app;
