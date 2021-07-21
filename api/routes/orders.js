const express = require('express');
const router = express.Router();


router.get('/',(req,res,next)=>{
    res.status(200).json(
        {
            message:"Fetched All Orders"
        }
    )
});


router.post('/',(req,res,next)=>{
    res.status(201).json(
        {
            message:"Placed Order"
        }
    )
});


router.get('/:orderID',(req,res,next)=>{
    const id = req.params.orderID;
    res.status(200).json(
        {
            message:"Fetched details for OrderID "+id
        }
    )
});


router.delete('/:orderID',(req,res,next)=>{
    const id = req.params.orderID;
    res.status(200).json(
        {
            message:"Cancelled OrderID "+id
        }
    )
});

module.exports = router;