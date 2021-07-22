//import external dependent libraries
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
//import routes
const productRoutes = require('./api/routes/product-route');
const orderRoutes = require('./api/routes/order-route');
const connectionString = process.env.DB_URL;

//MongoDB connection
mongoose.connect(connectionString,{useNewUrlParser:true});

mongoose.connection.on("error", function(error) {
    console.log(error)
});

mongoose.connection.on("open", function() {
    console.log(mongoose.connection.readyState);
    console.log("Connected to MongoDB database.");
});
//logger
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));//alternative to body-parser
app.use(express.json()) // To parse the incoming requests with JSON payloads

//Setting Headers to response
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods',"GET, POST, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

//use routes
app.use('/product',productRoutes);
app.use('/order',orderRoutes);

//error handling
app.use('/',(req,res,next)=>{
    const error = new Error("Resource Unavailable. Please Check URI");
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({message:error.message});
});

module.exports = app;
