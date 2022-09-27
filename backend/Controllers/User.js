const express=require('express')
const router=express.Router()
const userModel=require('../Models/UserDetails')
const productModel=require('../Models/ProductDetails')
const jwt=require('jsonwebtoken')
// create all users (Admin)
router.post('/createUser',(req,res)=>{
    const cookieip=req.cookies.customertoken
    const decodedtoken=jwt.verify(cookieip,'aritry')
    if(decodedtoken.role==='admin'){
        const data=req.body
        const obj=new userModel({
            img:data.img,
            name:data.uname,
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
        obj.save().then((result)=>res.send({"data":result,"msg":"User created successfully!","status":true})).catch((e)=>res.send({"msg":"Some error occured, try again!","status":false}))
    }else{
        res.send({"msg":"You are not authorized!","status":false})
    }
})
// update all users (Admin)
router.post('/updateUser/:id',(req,res)=>{
    const data=req.body
    const cookieip=req.cookies.customertoken
    try{
        const decodedtoken=jwt.verify(cookieip,'aritry')
        if(decodedtoken.role==='admin'){
            userModel.updateOne({_id:req.params.id},{
                $set: {
                    img:data.img,
                    name:data.uname,
                    password:data.password,
                    email:data.email,
                    role:data.role,
                    phone:data.phone,
                    address:data.address
                }
            }).then((result)=>res.send({"data":result,"msg":"User data is updated successfully!","status":true})).catch((e)=>res.send({"msg":"Error in updating user data!","status":false}))
        }else{
            res.send({"msg":"You are not authorized to do that action!","status":false})
        }
    }
    catch(e){
        res.status(404).send({"msg":'You are not authorized!',"reason":e.message,"status":false})
    }
})
// update profile (all)
router.post('/updateProfile/:id',(req,res)=>{
    const data=req.body
    const cookieip=req.cookies.customertoken
    try{
        const decodedtoken=jwt.verify(cookieip,'aritry')
        // if(decodedtoken.role==='user'){
            userModel.updateOne({_id:req.params.id},{
                $set: {
                    img:data.img,
                    name:data.uname,
                    email:data.email,
                    phone:data.phone,
                    address:data.address
                }
            }).then((result)=>res.send({"data":result,"msg":"User data is updated successfully!","status":true})).catch((e)=>res.send({"msg":"Error in updating user data!","status":false}))
        // }else{
        //     res.send({"msg":"You are not authorized to do that action!","status":false})
        // }
    }
    catch(e){
        res.status(404).send({"msg":'You are not authorized!',"reason":e.message,"status":false})
    }
})
// update password (user)
router.post('/updatePassword/:id',(req,res)=>{
    const data=req.body
    userModel.updateOne({_id:req.params.id},{
        $set: {
            password:data.password
        }
    }).then((result)=>res.send({"data":result,"msg":"User password is updated successfully!","status":true})).catch((e)=>res.send({"msg":"Error in updating user password!","status":false}))
})
// otp updation (user)
router.post('/updateOTP/:id',(req,res)=>{
    const data=req.body
    userModel.updateOne({_id:req.params.id},{
        $set: {
            otp:data.otp,
            otpCreatedAt:data.otpCreatedAt,
            otpExpiryTime:data.otpExpiryTime
        }
    }).then((result)=>res.send({"data":result,"msg":"OTP is updated successfully!","status":true})).catch((e)=>res.send({"msg":"Error in updating OTP!","status":false}))
})
// coupon updation (Admin)
router.post('/updateCoupon/:id',(req,res)=>{
    const data=req.body
    const cookieip=req.cookies.customertoken
    try{
        const decodedtoken=jwt.verify(cookieip,'aritry')
        if(decodedtoken.role==='admin'){
            userModel.updateOne({_id:req.params.id},{
                $set: {
                    coupon:data.coupon,
                    couponCreatedAt:data.couponCreatedAt,
                    couponExpiryTime:data.couponExpiryTime
                }
            }).then((result)=>res.send({"data":result,"msg":"Coupon is updated successfully!","status":true})).catch((e)=>res.send({"msg":"Error in updating coupon!","status":false}))
        }else{
            res.send({"msg":"You are not authorized to do that action!","status":false})
        }
    }
    catch(e){
        res.status(404).send({"msg":'You are not authorized!',"reason":e.message,"status":false})
    }
})
// delete user (admin)
router.post('/deleteUser/:id',(req,res)=>{
    const cookieip=req.cookies.customertoken
    try{
        const decodedtoken=jwt.verify(cookieip,'aritry')
        if(decodedtoken.role==='admin'){
            userModel.deleteOne({_id:req.params.id}).then((result)=>res.status(200).send({"data":result,"msg":"User deleted successfully!","status":true})).catch((err)=>res.status(500).send({"msg":"Error in deleting user!","status":false}))
        }else{
            res.send({"msg":"You are not authorized to do that action!","status":false})
        }
    }
    catch(e){
        res.status(404).send({"msg":'You are not authorized!',"reason":e.message,"status":false})
    }
})
// get all users (all)
router.get('/getUsers',(req,res)=>{
    userModel.find().then((result)=>res.send({"data":result,"msg":'All users!',"status":true})).catch((e)=>res.send({"msg":"Error occured while getting all the users!","status":false}))
})
// get one user (all)
router.get('/getUser/:id',(req,res)=>{
    userModel.findOne({_id:req.params.id}).then((result)=>res.send({"user":result,"msg":"User found!","status":true})).catch((err)=>res.send({"msg":"Error in collecting the user data!","status":false}))
})
// update cartlist (user)
router.post('/updateCartList/:id',(req,res)=>{
    const data=req.body
    console.log("show product data",data)
    console.log('id matching',req.params.id)
    console.log('..............................')
    // const cookieip=req.cookies.customertoken
    try{
        // const decodedtoken=jwt.verify(cookieip,'aritry')
        // if(decodedtoken.role==='user'){
            
                // if(result){
                //    result.cartList.findOne({_id:data._id},{
                //     $inc: {
                //         qty:1
                //     }
                //    })
                   
                // }
                
                    userModel.updateOne({_id:req.params.id},{
                        $push: {
                            cartList: data
                        }
                    }).then((result)=>res.send({"data":result,"msg":"Cart list is updated successfully!","status":true})).catch((e)=>res.send({"msg":"Error in updating cart list!","status":false}))
                
            
        
       
    }
    catch(e){
        res.status(404).send({"msg":'You are not authorized!',"reason":e.message,"status":false})
    }
})
// delete cart items (user)
router.post('/deleteCartItem/:id',(req,res)=>{
    const data=req.body
    const cookieip=req.cookies.customertoken
    try{
        const decodedtoken=jwt.verify(cookieip,'aritry')
        if(decodedtoken.role==='user'){
            userModel.updateOne({_id:req.params.id},{
                $pull: {
                    cartList: {_id:data.id}
                }
            }).then((result)=>res.send({"data":result,"msg":"Cart list item is deleted successfully!","status":true})).catch((e)=>res.send({"msg":"Error found in cart list item deletion!","status":false}))
        }else{
            res.send({"msg":"You are not authorized to do that action!","status":false})
        }
    }
    catch(e){
        res.status(404).send({"msg":'You are not authorized!',"reason":e.message,"status":false})
    }
})
// get cart items (user)
router.get('/getCartList/:id',(req,res)=>{
    console.log('inside get cart List......')
    userModel.findOne({_id:req.params.id}).then((result)=>{
        // console.log(".....cartitmes",result.cartList)
        res.send({"cartList":result.cartList,"msg":'All cart items!',"status":true})}).catch((e)=>res.send({"msg":"Error occured while getting cart data!","status":false}))
})
// update wishlist (user)
router.post('/updateWishList/:id',(req,res)=>{
    const data=req.body
    const cookieip=req.cookies.customertoken
    try{
        const decodedtoken=jwt.verify(cookieip,'aritry')
        if(decodedtoken.role==='user'){
            userModel.updateOne({_id:req.params.id},{
                $push: {
                    wishList: data.data
                }
            }).then((result)=>res.send({"data":result,"msg":"Wishlist is updated successfully!","status":true})).catch((e)=>res.send({"msg":"Error in updating wishlist!","status":false}))
        }else{
            res.send({"msg":"You are not authorized to do that action!","status":false})
        }
    }
    catch(e){
        res.status(404).send({"msg":'You are not authorized!',"reason":e.message,"status":false})
    }
})
// delete wishlist items (user)
router.post('/deleteWishlistItem/:id',(req,res)=>{
    const data=req.body
    const cookieip=req.cookies.customertoken
    try{
        const decodedtoken=jwt.verify(cookieip,'aritry')
        if(decodedtoken.role==='user'){
            userModel.updateOne({_id:req.params.id},{
                $pull: {
                    wishList: {_id:data.id}
                }
            }).then((result)=>res.send({"data":result,"msg":"Wishlist item is deleted successfully!","status":true})).catch((e)=>res.send({"msg":"Error found in wishlist item deletion!","status":false}))
        }else{
            res.send({"msg":"You are not authorized to do that action!","status":false})
        }
    }
    catch(e){
        res.status(404).send({"msg":'You are not authorized!',"reason":e.message,"status":false})
    }
})
// get wishlist items (user)
router.get('/getWishList/:id',(req,res)=>{
    userModel.findOne({_id:req.params.id}).then((result)=>{res.send({"wishList":result.wishList,"msg":'All wishlist items!',"status":true})}).catch((e)=>res.send({"msg":"Error occured while getting wishlist data!","status":false}))
})
// update order list (user)
router.post('/updateOrderList/:id',(req,res)=>{
    const data=req.body
    const cookieip=req.cookies.customertoken
    try{
        const decodedtoken=jwt.verify(cookieip,'aritry')
        if(decodedtoken.role==='user'){
            userModel.updateOne({_id:req.params.id},{
                $push: {
                    orderList: data.data
                }
            }).then((result)=>res.send({"data":result,"msg":"Order list is updated successfully!","status":true})).catch((e)=>res.send({"msg":"Error in updating order list!","status":false}))
        }else{
            res.send({"msg":"You are not authorized to do that action!","status":false})
        }
    }
    catch(e){
        res.status(404).send({"msg":'You are not authorized!',"reason":e.message,"status":false})
    }
})
// delete ordered items (user)
router.post('/deleteOrderedItem/:id',(req,res)=>{
    const data=req.body
    const cookieip=req.cookies.customertoken
    try{
        const decodedtoken=jwt.verify(cookieip,'aritry')
        if(decodedtoken.role==='user'){
            userModel.updateOne({_id:req.params.id},{
                $pull: {
                    orderList: {_id:data.id}
                }
            }).then((result)=>res.send({"data":result,"msg":"Order list item is deleted successfully!","status":true})).catch((e)=>res.send({"msg":"Error found in order list item deletion!","status":false}))
        }else{
            res.send({"msg":"You are not authorized to do that action!","status":false})
        }
    }
    catch(e){
        res.status(404).send({"msg":'You are not authorized!',"reason":e.message,"status":false})
    }
})
// get ordered items (user)
router.get('/getOrderList/:id',(req,res)=>{
    userModel.findOne({_id:req.params.id}).then((result)=>{res.send({"orderList":result.orderList,"msg":'All ordered items!',"status":true})}).catch((e)=>res.send({"msg":"Error occured while getting orderlist data!","status":false}))
})
module.exports=router