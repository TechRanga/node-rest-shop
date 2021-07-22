const express = require('express');
const router = express.Router();

/*
GET Request Interface.
Returns all available order
*/
router.get('/', (req,res,next)=>{
        res.status(200).json({message:"Fetched All Orders"});        
});

/*
POST Request Interface.
Creates new Product record
*/
router.post('/', (req,res,next)=>{
        res.status(201).json({message:"Created new Order"})
});

/*
GET Request Interface.
Returns specific order based on param@orderID
*/
router.get('/:orderID', (req,res,next)=>{
        const orderID = req.params.orderID;
        res.status(200).json({message:"Fetched Order ID: "+orderID});        
});

/*
PATCH Request Interface.
Updates specific order based on param@orderID
*/
router.patch('/:orderID', (req,res,next)=>{
    const orderID = req.params.orderID;
    res.status(200).json({message:"Updated Order ID: "+orderID});        
});


/*
DELETE Request Interface.
Cancels specific order based on param@orderID
*/
router.delete('/:orderID', (req,res,next)=>{
    const orderID = req.params.orderID;
    res.status(200).json({message:"Cancelled Order ID: "+orderID});        
});

module.exports = router;