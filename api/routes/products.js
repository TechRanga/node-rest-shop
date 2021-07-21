const express = require('express');
const router = express.Router();

router.get('/', (req,res,next)=>{
    res.status(200).json({
        message:"Handling GET Reqeust to /product"
    })
});

router.post('/', (req,res,next)=>{
    res.status(201).json({
        message:"Handling POST Reqeust to /product"
    })
});

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    if(id==='special'){
        res.status(200).json(
            {
                message:'You discovered the special product'
            }
        );
    }else{
        res.status(200).json({
            message: 'You get details for product id '+id,
        })
    }
});



router.patch('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    res.status(201).json({
        message: 'You updated details for product id '+id,
    });   
});


router.delete('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    res.status(200).json({
        message: 'You deleted details for product id '+id,
    });   
});


module.exports = router;