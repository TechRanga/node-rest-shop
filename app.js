//import external dependent libraries
const express = require('express');
const app = express();
//import routes
const productRoutes = require('./api/routes/product-route');
const orderRoutes = require('./api/routes/order-route');

app.use('/product',productRoutes);
app.use('/order',orderRoutes);

module.exports = app;
