const express=require('express')
const router=express.Router()
const userModel=require('../Models/UserDetails')
router.post('/signup',(req,res)=>{
    const data=req.body
    console.log(data)
    const obj=new userModel({
        img:data.img,
        name:data.name,
        password:data.password,
        email:data.email,
        role:data.role,
        phone:data.phone,
        address:data.address,
        cartList:[],
        wishList:[],
        orderList:[],
        coupon:"",
        couponCreatedAt:0,
        couponExpiryTime:0,
        otp:null,
        otpCreatedAt:0,
        otpExpiryTime:0
    })
    obj.save().then((result)=>res.send({"msg":"Signup succeeded!","status":true})).catch((e)=>res.send({"msg":"Some error occured, try again!","status":false}))
})
module.exports=router