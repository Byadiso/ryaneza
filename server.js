import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import expressValidator from 'express-validator';
require('dotenv').config(); 
import path from 'path';


//import routes 

import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import categoryRoutes from './routes/category';
import productRoutes from './routes/property';
import braintreeRoutes from './routes/braintree';
import orderRoutes from './routes/order';


//app 
const app = express();

//for cross origin 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

//db
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://byadiso:Uwineza3010@cluster0.kbaby.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' ,  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=>console.log('DB Connected')).catch((err)=>{
    console.error(`Error connecting to  the database . \n${err}`);
});

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());


app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

//routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use('/api', braintreeRoutes);
app.use('/api', orderRoutes);



// set header

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


// set static pages

app.use(express.static(__dirname));
app.use(express.static('public'));

// set up route

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
        res.status(200)
        .json({
            status: 200,
            message: 'Welcome to PropertyPro-Lite you can sale or rent your needs!',
        })
})



app.use('*', (req, res) => {
    res.status(400).json({
        status: 400,
        message: "Sorry this router doesn't exist !",
    })
})



//-----------------For Front-End---------------------//

//for render index

app.get('/', function (req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('/index.html');
})

// for render sign-up



// for render login
  app.get('/login', function (req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('/login.html');
})
//for index page
app.get('/index', (_req, res) => {
    res.sendFile(__dirname + '/public/index.html')
        .status(200)
        .json({
            status: 200,
            message: 'Welcome to PropertyPro-Lite you can sale or rent your needs!',
        })
})


const port = process.env.PORT || 3000 ;


if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client','build', 'index.html'))
    });
} else {
    app.get("/",(req,res)=>{
        res.send("Api running");
    });
}

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})