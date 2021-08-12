const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/product-schema');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ProductController = require('../controllers/product-controller');

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./resources/upload/')
    },
    filename:function(req,file,cb){
        cb(null, file.originalname);
    }
});

// const fileFilter = (req,res,cb)=>{
//     if(file.mimetype==='img/png' || file.mimetype==='application/octet-stream'){
//         cb(true);
//     }else{
//         cb(false);
//     }
// }

const upload = multer({storage:storage, limits:{
    fileSize:1024*1024*5
}});

const router = express.Router();

/*
GET Request Interface.
Returns all available products
*/
router.get('/', ProductController.product_get_all);

/*
POST Request Interface.
Creates new Product record
*/
router.post('/',checkAuth, upload.single('productImage'),ProductController.product_create_product);

/*
GET Request Interface.
Returns specific product based on ID passed
*/
router.get('/:productID', ProductController.product_get_by_productID);

/*
PATCH Request Interface.
Updates a single record with updated information matching provided ID 
*/
router.patch('/:productID', checkAuth, ProductController.product_patch_by_productID);


/*
DELETE Request Interface.
Removes record matching provided productID
*/
router.delete('/:productID',checkAuth, ProductController.product_remove_product);

module.exports = router;