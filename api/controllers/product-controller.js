const Product = require('../models/product-schema');
const mongoose = require('mongoose');

exports.product_get_all = (req,res,next)=>{
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
};

exports.product_create_product = (req,res,next)=>{
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
};


exports.product_get_by_productID = (req,res,next)=>{
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
};


exports.product_patch_by_productID = (req,res,next)=>{
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
};


exports.product_remove_product = (req,res,next)=>{
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
};