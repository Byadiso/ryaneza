'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _auth = require('./routes/auth');

var _auth2 = _interopRequireDefault(_auth);

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

var _category = require('./routes/category');

var _category2 = _interopRequireDefault(_category);

var _property = require('./routes/property');

var _property2 = _interopRequireDefault(_property);

var _braintree = require('./routes/braintree');

var _braintree2 = _interopRequireDefault(_braintree);

var _order = require('./routes/order');

var _order2 = _interopRequireDefault(_order);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

//import routes 

//app 
var app = (0, _express2.default)();

//for cross origin 
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

//db

_mongoose2.default.connect(process.env.MONGODB_URI || 'mongodb+srv://byadiso:Uwineza3010@cluster0.kbaby.mongodb.net/ryaneza?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(function () {
    return console.log('DB Connected');
}).catch(function (err) {
    console.error('Error connecting to  the database . \n' + err);
});

//middlewares
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use((0, _cookieParser2.default)());
app.use((0, _expressValidator2.default)());
app.use((0, _cors2.default)());

app.use(_express2.default.urlencoded({
    extended: false
}));
app.use(_express2.default.json());

//routes middleware
app.use("/api", _auth2.default);
app.use("/api", _user2.default);
app.use("/api", _category2.default);
app.use("/api", _property2.default);
app.use('/api', _braintree2.default);
app.use('/api', _order2.default);

// set header

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// set static pages

app.use(_express2.default.static(__dirname));
app.use(_express2.default.static('public'));

// set up route

app.get('/', function (_req, res) {
    res.sendFile(_path2.default.join(__dirname + '/public/index.html'));
    res.status(200).json({
        status: 200,
        message: 'Welcome to PropertyPro-Lite you can sale or rent your needs!'
    });
});

app.use('*', function (req, res) {
    res.status(400).json({
        status: 400,
        message: "Sorry this router doesn't exist !"
    });
});

//-----------------For Front-End---------------------//

//for render index

app.get('/', function (req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('/index.html');
});

// for render sign-up


// for render login
app.get('/login', function (req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('/login.html');
});
//for index page
app.get('/index', function (_req, res) {
    res.sendFile(__dirname + '/public/index.html').status(200).json({
        status: 200,
        message: 'Welcome to PropertyPro-Lite you can sale or rent your needs!'
    });
});

var port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
    app.use(_express2.default.static('client/build'));

    app.get('*', function (req, res) {
        res.sendFile(_path2.default.resolve(__dirname, 'client', 'build', 'index.html'));
    });
} else {
    app.get("/", function (req, res) {
        res.send("Api running");
    });
}

app.listen(port, function () {
    console.log('Server is running on port ' + port);
});