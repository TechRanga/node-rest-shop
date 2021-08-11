const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/product-schema');
const multer = require('multer');


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./resources/upload/')
    },
    filename:function(req,file,cb){
        cb(null, file.originalname);
    }
});

const fileFilter = (req,res,cb)=>{
    if(file.mimetype==='img/png' || file.mimetype==='application/octet-stream'){
        cb(true);
    }else{
        cb(false);
    }
}

const upload = multer({storage:storage, limits:{
    fileSize:1024*1024*5
}});

const router = express.Router();

/*
GET Request Interface.
Returns all available products
*/
router.get('/', (req,res,next)=>{
        Product.find()
        .select('-__v')
        .exec()
        .then(
        docs =>{
            let response = {
                count:docs.length,
                products:docs
            };
            res.status(200).json(response);
        }).catch(
            error=>{
                console.log(error);
                res.status(500).json({message:"An Exception Ocurred",error:error});
        });
});

/*
POST Request Interface.
Creates new Product record
*/
router.post('/', upload.single('productImage'),(req,res,next)=>{
    console.log(req.file);
        const product = new Product({
                _id: new mongoose.Types.ObjectId(),
                name:req.body.name,
                price:req.body.price,
                productImgURL:req.file.path
            });
        product.save().then(
            (result)=>{
                let response={
                    message:"Added New Product",
                    product:result
                }
                res.status(201).json(response);
            }
        )
        .catch(
            error=>{
                console.log(error);
                res.status(500).json({message:"Error Ocurred",error:error});
            }
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
                if(doc){
                    let response = {
                        message:"Found Product",product:doc
                    }
                    res.status(200).json(response);
                }else{
                    res.status(404).json({message:"No Entry Found"});
                }
                
            }
        ).catch(
            error=>{
                console.log(error);
                res.status(500).json({message:error})
        });
           
});

/*
PATCH Request Interface.
Updates a single record with updated information matching provided ID 
*/
router.patch('/:productID', (req,res,next)=>{
    const productID = req.params.productID;
    const updateOps = {};
    const payload = req.body;
    if(payload){
        payload.map(
            item=>{
                Object.keys(item).map(
                    key=>{
                        updateOps[key] = item[key];
                    }
                )
            }
        )
    }
    console.log(updateOps);
    Product.updateOne({_id: productID}, {$set: updateOps}).exec()
    .then(
        result=>{
            console.log(result);
            res.status(200).json({result});
        }
    )
    .catch(
        error=>{
            res.status(500).json({message:error})
        }
    );
            
});


/*
DELETE Request Interface.
Removes record matching provided productID
*/
router.delete('/:productID', (req,res,next)=>{
    const productID = req.params.productID;
    Product.deleteOne({_id:productID}).exec()
    .then(
        result=>{
            res.status(200).json({message:"Removed Product ID: "+productID});  
        }
    )
    .catch(
        error=>{
            res.status(500).json({error:error});
        }
    )
          
});

module.exports = router;