'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('./routes/routes');

var _routes2 = _interopRequireDefault(_routes);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//set up dependencies

// eslint-disable-next-line prettier/prettier

//import dependencie

var app = (0, _express2.default)();

app.use(_express2.default.urlencoded({
    extended: false
}));
app.use(_express2.default.json());
app.use(_bodyParser2.default.json());
app.use((0, _cors2.default)());

app.use(_routes2.default);

// set header

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(_express2.default.static(__dirname));

// set static pages

app.use(_express2.default.static('public/pages'));

// set up route

app.get('/', function (_req, res) {
    res.sendFile(__dirname + '/public/index.html').status(200).json({
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

// app.get('/login',(req,res) =>{
//     res.redirect(__dirname + '/public/pages/index.html')
//         .status(200)
//         .json({
//             status:200, 
//             message: 'welcome beautiful user'})
// })

var port = process.env.PORT || 3000;

app.listen(port, function () {
    return console.log('Welcome to MY Property Pro Lite Land Server!!....');
});

exports.default = app;