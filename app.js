//import external dependent libraries
const express = require('express');
const app = express();
const morgan = require('morgan');
//import routes
const productRoutes = require('./api/routes/product-route');
const orderRoutes = require('./api/routes/order-route');

//logger
app.use(morgan('dev'));

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
