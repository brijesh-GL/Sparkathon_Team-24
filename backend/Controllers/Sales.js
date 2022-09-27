const express=require('express')
const router=express.Router()
const userModel=require('../Models/UserDetails')
const productModel=require('../Models/ProductDetails')
const salesReportModel=require('../Models/SalesReport')
const jwt=require('jsonwebtoken')
// create sales report (user)
// salesReportModel.syncIndexes()
router.post('/createSales',(req,res)=>{
    const data=req.body
    console.log(data)
    // const cookieip=req.cookies.customertoken
    try{
        // const decodedtoken=jwt.verify(cookieip,'aritry')
        const obj=new salesReportModel({
            // userEmail:data.userEmail,
            // productTitle:data.productTitle,
            // productPrice:data.productPrice,
            // productQuantity:data.productQuantity,
            orderDateTime:new Date().toLocaleString(),
            userEmail:data.email,
            productTitle:data.title,
            productPrice:data.price,
            productQuantity:data.stocks,
            
        })
        obj.save().then((result)=>res.send({"msg":"Sale history created successfully!","status":true})).catch((e)=>res.send({"msg":"Some error occured, try again!","status":false,"err":e.message}))
    }
    catch(e){
        res.status(404).send({"msg":'You are not authorized!',"reason":e.message,"status":false})
    }
})
// delete sales report (admin)
router.post('/deleteSales/:id',(req,res)=>{
    const cookieip=req.cookies.customertoken
    try{
        const decodedtoken=jwt.verify(cookieip,'aritry')
        if(decodedtoken.role==='admin'){
            salesReportModel.deleteOne({_id:req.params.id}).then((result)=>res.status(200).send({"data":result,"msg":"Sale deleted successfully!","status":true})).catch((err)=>res.status(500).send({"msg":"Error in deleting sale!","status":false}))
        }else{
            res.send({"msg":"You are not authorized to do that action!","status":false})
        }
    }
    catch(e){
        res.status(404).send({"msg":'You are not authorized!',"reason":e.message,"status":false})
    }
})
// get sales report (admin)
router.get('/getSales',(req,res)=>{
    const cookieip=req.cookies.customertoken
    try{
        const decodedtoken=jwt.verify(cookieip,'aritry')
        if(decodedtoken.role==='admin'){
            salesReportModel.find().then((result)=>res.send({"data":result,"msg":'All sales report!',"status":true})).catch((e)=>console.log(e))
        }else{
            res.send({"msg":"You are not authorized to do that action!","status":false})
        }
    }
    catch(e){
        res.status(404).send({"msg":'You are not authorized!',"reason":e.message,"status":false})
    }
})
module.exports=router