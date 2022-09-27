const mongoose=require('mongoose')
mongoose.connect("mongodb://localhost:27017/UserDetailsCollection").then((res)=>console.log("Connected to db!")).catch((e)=>console.log("Error in connection: ",e))
const userModel=mongoose.model("FinalUserCollection",{
    img:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    phone:{
        type:Number,
        trim:true,
        required:true,
        unique:true
    },
    address:{
        type:String,
        trim:true,
        required:true
    },
    password:{
        type:String,
        trim:true,
        required:true,
        minlength:8
    },
    role:{
        type:String,
        default:"user",
        enum:['user','admin']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    cartList:{
        type:Array
    },
    wishList:{
        type:Array
    },
    orderList:{
        type:Array
    },
    coupon:{
        type:String
    },
    couponCreatedAt:{
        type:Number
    },
    couponExpiryTime:{
        type:Number
    },
    otp:{
        type:Number
    },
    otpCreatedAt:{
        type:Number
    },
    otpExpiryTime:{
        type:Number
    }
})
module.exports=userModel