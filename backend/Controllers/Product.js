const express=require('express')
const router=express.Router()
const userModel=require('../Models/UserDetails')
const productModel=require('../Models/ProductDetails')
const jwt=require('jsonwebtoken')
// product creation (admin)
router.post('/createProduct',(req,res)=>{
    const cookieip=req.cookies.customertoken
    const decodedtoken=jwt.verify(cookieip,'aritry')
    if(decodedtoken.role==='admin'){
        const data=req.body
        // const obj=new productModel({
        //     img:data.img,
        //     category:data.category,
        //     title:data.title,
        //     description:data.description,
        //     primaryMaterial:data.primaryMaterial,
        //     isReturnable:data.isReturnable,
        //     stocks:data.stocks,
        //     price:data.price
        // })
        // obj.save().then((result)=>res.send({"msg":"Product created successfully!","status":true})).catch((e)=>res.send({"msg":"Some error occured, try again!","status":false}))
        productModel.insertMany(data.data).then((result)=>res.send({"data":result,"msg":"Product created successfully!","status":true})).catch((e)=>res.send({"msg":"Some error occured, try again!","status":false}))
    }else{
        res.send({"msg":"You are not authorized!","status":false})
    }
})
// update product (admin)
router.post('/updateProduct/:id',(req,res)=>{
    const data=req.body
    const cookieip=req.cookies.customertoken
    try{
        const decodedtoken=jwt.verify(cookieip,'aritry')
        if(decodedtoken.role==='admin'){
            productModel.updateOne({_id:req.params.id},{
                $set: {
                    img:data.img,
                    category:data.category,
                    title:data.title,
                    description:data.description,
                    primaryMaterial:data.primaryMaterial,
                    isReturnable:data.isReturnable,
                    stocks:data.stocks,
                    price:data.price
                }
            }).then((result)=>res.send({"data":result,"msg":"Product list is updated successfully!","status":true})).catch((e)=>res.send({"msg":"Error in updating product list!","status":false}))
        }else{
            res.send({"msg":"You are not authorized to do that action!","status":false})
        }
    }
    catch(e){
        res.status(404).send({"msg":'You are not authorized!',"reason":e.message,"status":false})
    }
})
// decrement product stocks (All)
router.post('/deleteStocks/:id',(req,res)=>{
    const cookieip=req.cookies.customertoken
    try{
        const decodedtoken=jwt.verify(cookieip,'aritry')
        productModel.updateOne({_id:req.params.id},{
            $inc: {
                stocks:-1
            }
        }).then((result)=>res.send({"data":result,"msg":"Product stocks are updated successfully!","status":true})).catch((e)=>res.send({"msg":"Error in updating product stocks!","status":false}))
    }
    catch(e){
        res.status(404).send({"msg":'You are not authorized!',"reason":e.message,"status":false})
    }
})
// increment product stocks (All)
router.post('/addStocks/:id',(req,res)=>{
    const cookieip=req.cookies.customertoken
    try{
        const decodedtoken=jwt.verify(cookieip,'aritry')
        productModel.updateOne({_id:req.params.id},{
            $inc: {
                stocks:1
            }
        }).then((result)=>res.send({"data":result,"msg":"Product stocks are updated successfully!","status":true})).catch((e)=>res.send({"msg":"Error in updating product stocks!","status":false}))
    }
    catch(e){
        res.status(404).send({"msg":'You are not authorized!',"reason":e.message,"status":false})
    }
})
// delete product (admin)
router.post('/deleteProduct/:id',(req,res)=>{
    const cookieip=req.cookies.customertoken
    try{
        const decodedtoken=jwt.verify(cookieip,'aritry')
        if(decodedtoken.role==='admin'){
            productModel.deleteOne({_id:req.params.id}).then((result)=>res.status(200).send({"data":result,"msg":"Product deleted successfully!","status":true})).catch((err)=>res.status(500).send({"msg":"Error in deleting product!","status":false}))
        }else{
            res.send({"msg":"You are not authorized to do that action!","status":false})
        }
    }
    catch(e){
        res.status(404).send({"msg":'you are not authorized',"reason":e.message,"status":false})
    }
})
// get all products (All)
router.get('/getProducts',(req,res)=>{
    productModel.find().then((result)=>res.send({"data":result,"msg":'All products!',"status":true})).catch((e)=>res.send({"msg":"Error occured while getting all the products!","status":false}))
})

///......get Single matching Products (All)..

router.get('/getMatchProduct/:id',(req,res)=>{
    console.log(req.params.id)
    productModel.findOne({_id:req.params.id}).then((result)=>res.send({"data":result,"msg":'All products!',"status":true})).catch((e)=>res.send({"msg":"Error occured while getting all the products!","status":false}))
})

module.exports=router