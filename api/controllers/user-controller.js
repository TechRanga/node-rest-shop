const mongoose = require('mongoose');
const User = require('../models/user-schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.user_register = (req,res,next)=>{
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
};


exports.user_login = (req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(
        users=>{
            if(users.length<1){
                return res.status(401).json({message:"Auth Failed"});
            }
            bcrypt.compare(req.body.password,users[0].password,(error,result)=>{
                if(error){
                    return res.status(401).json({message:"Auth Failed"});
                }
                if(result){
                    const token = jwt.sign({email:users[0].email,userID:users[0]._id}
                        ,process.env.JWT_TOKEN_KEY
                        ,{expiresIn:"1h"});
                    return res.status(200).json({message:"Authorized",token:token});
                }
                return res.status(401).json({message:"Auth Failed"});
            });
        }
    )
    .catch(
        error=>{
            return res.status(500).json({message:"Could not complete operation",error:error});
        }
    )
};


exports.user_delete = (req,res,next)=>{
    User.remove({_id:req.params.userID})
    .exec()
    .then(
        response=>{
            return res.status(200).json({message:"User deleted",response:response});
        }
    )
    .catch(
        error=>{
            return res.status(500).json({message:"Could not complete operation",error:error});
        }
    )
};