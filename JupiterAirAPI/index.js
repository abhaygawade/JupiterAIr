const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');

const apiRoutes = require('./routes/api.route');

const app = express();
const router = express.Router()
const PORT = 3000;

//connect to mongo db
mongoose.connect('mongodb://localhost:27017/jupiterair');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database connection successful!');
});

require('./config/passport');
app.use(passport.initialize());
//routing
app.use('/api', apiRoutes);
app.get('/', (req, res) => res.send('Dont try to play with our API'));

app.listen(PORT
    , () => console.log(`app listening on port ${PORT}!`));