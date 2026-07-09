import mongoose from "mongoose";

const OtpSchema= mongoose.Schema({
    otp:{
        type:String,
        required:true,
    }
    
})