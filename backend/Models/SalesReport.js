const mongoose=require('mongoose')
mongoose.connect("mongodb://localhost:27017/UserDetailsCollection").then((res)=>console.log("Connected to db!")).catch((e)=>console.log("Error in connection: ",e))
const salesReportModel=mongoose.model("FinalSalesReport",{
    userEmail:{
        type:String,
        required:true
    },
    productTitle:{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    productQuantity:{
        type:Number,
        required:true
    },
    orderDateTime:{
        type:String,
        // required:true
    }
})
module.exports=salesReportModel