const express=require('express')
const userRouter=express.Router()
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const { UserModel } = require('../Model/user.model')

userRouter.get('/getusers',async(req,res)=>{
    try{
    const user=await UserModel.find()
    console.log(user)
    if(user!=undefined){
        res.status(200).send({"user":user})
       }
       else{
        res.status(200).send({"msg":"You are not authorized"})
       }
    }
    catch(err){
        res.status(400).send({"error":err})
    }
})
userRouter.post('/signup',(req,res)=>{
    const {username,email,password,role}=req.body
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.status(200).send({"err":err})
            }
            else{
                const user=new UserModel({username:username,email:email,password:hash,role:role})
                await user.save()
                res.status(200).send({"msg":"A user has been registered"})
            }
        })
    }
    catch(err){
        console.log(err)
       res.status(400).send({"err":err})
    }
})
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.findOne({email})
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                const token=jwt.sign({username:user.username,userid:user.id},"masai")
                res.status(200).send({"msg":"Login Successfull","token":token,"user":user})
            }
            else{
                res.status(200).send({"msg":"wrong Credentials"})
            }
        })
    }
    catch(err){
        res.status(400).send({"err":err})
    }
})
module.exports={userRouter}