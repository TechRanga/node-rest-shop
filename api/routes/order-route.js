const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const OrderController = require('../controllers/order-controller');


/*
GET Request Interface.
Returns all available orders
*/
router.get('/',checkAuth,OrderController.order_get_all);

/*
POST Request Interface.
Creates new Order record
*/
router.post('/', checkAuth,OrderController.order_create_order);

/*
GET Request Interface.
Returns specific order based on param@orderID
*/
router.get('/:orderID', checkAuth, OrderController.order_get_by_orderID);

/*
DELETE Request Interface.
Cancels specific order based on param@orderID
*/
router.delete('/:orderID', checkAuth, OrderController.order_remove_by_orderID);

module.exports = router;