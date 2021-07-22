const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/product-schema');
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
        const product = new Product({
                _id: new mongoose.Types.ObjectId(),
                name:req.body.name,
                price:req.body.price
            });
        product.save().then(
            (result)=>{
                res.status(201).json({message:"Added Product",createdProduct:result});
            }
        )
        .catch(
            error=>{console.log(err);}
        );         
});

/*
GET Request Interface.
Returns specific product based on ID passed
*/
router.get('/:productID', (req,res,next)=>{
        const productID = req.params.productID;
        Product.findById(productID).exec().then(
            doc =>{
                res.status(200).json({message:"Found Product",product:doc});
            }
        ).catch(
            error=>{
                console.log(error);
                res.status(500).json({message:error})
        });
           
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