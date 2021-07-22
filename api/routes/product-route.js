const express = require('express');
const router = express.Router();

/*
GET Request Interface.
Returns all available products
*/
router.get('/', (req,res,next)=>{
        res.status(200).json({message:"Fetched Products"});        
});

/*
POST Request Interface.
Creates new Product record
*/
router.post('/', (req,res,next)=>{
        res.status(201).json({message:"Added Product"})
});

/*
GET Request Interface.
Returns specific product based on ID passed
*/
router.get('/:productID', (req,res,next)=>{
        const productID = req.params.productID;
        res.status(200).json({message:"Fetched Product ID: "+productID});        
});

/*
PATCH Request Interface.
Returns all available products
*/
router.patch('/:productID', (req,res,next)=>{
    const productID = req.params.productID;
    res.status(200).json({message:"Updated Product ID: "+productID});        
});


/*
DELETE Request Interface.
Returns all available products
*/
router.delete('/:productID', (req,res,next)=>{
    const productID = req.params.productID;
    res.status(200).json({message:"Removed Product ID: "+productID});        
});

module.exports = router;