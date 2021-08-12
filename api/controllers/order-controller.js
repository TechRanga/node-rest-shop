const Order = require('../models/order-schema');
const Product = require('../models/product-schema');
const mongoose = require('mongoose');

exports.order_get_all = (req,res,next)=>{
    Order.find()
    .select('-__v')
    .populate('product', 'name price')
    .exec()
    .then(
            docs=>{
                    res.status(200).json({
                            count:docs.length,
                            orders:docs
                    });
            }
    )
    .catch(
            error=>{
                    res.status(500).json({error:error});
            }
    );      
};


exports.order_create_order = (req,res,next)=>{
    Product.findById(req.body.productID)
    .exec()
    .then(
            product=>{
                    if(product){
                            const order = new Order(
                                    {
                                            _id: new mongoose.Types.ObjectId(),
                                            quantity:req.body.quantity,
                                            product:req.body.productID
                                    }
                            );
                            return order.save();
                    }   
            }
    ).then(
      result=>{
            res.status(201).json({message:"Created new Order",order:result});
      }
    )
    .catch(
            error=>{
                    res.status(500).json(
                            {
                                    message:"Product Not Found",
                                    error:error
                            }
                            );
            }
    );  
};


exports.order_get_by_orderID = (req,res,next)=>{
    const orderID = req.params.orderID;
    Order.findById({_id:orderID})
    .select('-__v')
    .populate('product', 'name price')
    .exec()
    .then(
            order=>{
                    if(order){
                            res.status(200).json({message:"Fetched Order ID: "+orderID,order:order});  
                    }
            }         
    )
    .catch(
            error=>{
                    res.status(500).json(
                            {
                                    message:"Product Not Found",
                                    error:error
                            }
                            );
            }
    )    
};


exports.order_remove_by_orderID =  (req,res,next)=>{
    const orderID = req.params.orderID;
    Order.findById({_id:orderID}).exec()
    .then(
            order=>{
                    if(order){
                        return Order.deleteOne({_id:orderID});
                    }
            }
    )
    .then(
         result=>   {
                res.status(200).json({message:"Cancelled Order ID: "+orderID});      
            }
    )
    .catch(
            error=>{
                    res.status(500).json({message:"Could not complete operation",error:error});
            }
    );    
};