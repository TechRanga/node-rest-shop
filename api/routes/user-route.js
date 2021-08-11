const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user-schema');
const bcrypt = require('bcrypt');

router.post('/signup', (req,res,next)=>{

    User.find({email:req.body.email})
    .exec()
    .then(
        user=>{
            if(user.length>=1)
            {
                return res.status(422).json({message:"Email already exists"});
            }
            else{
                encryptedPwd = bcrypt.hash(req.body.password,10,(error,hash)=>{
                    if(error){
                        return res.status(500).json({error:error});
                    }else{
                        const user =   new User({
                            _id: new mongoose.Types.ObjectId(),
                            email:req.body.email,
                            password:hash,
                            name:req.body.name
                        });
                        user.save().then(
                            response=>{
                                res.status(200).json({response:response});
                            }
                        )
                        .catch(
                            error=>{
                                res.status(500).json({error:error});
                            }
                        )
                    }
                });
            }
        }
    )
    .catch(error=>{
        res.status(500).json({error:error});
    });
});





module.exports = router;

