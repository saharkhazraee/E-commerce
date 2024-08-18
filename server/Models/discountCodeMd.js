import mongoose from "mongoose";
const discountCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required:[true,"discount code is required"],
        unique:[true,"code already exist"]
    },
    discount:{
        type:Number,
        required:[true,"discount is required"],
        min:0,
        max:100
    },
    name:{
        type:String,
        required:[true,"discount name is required"]
    },
    expiredTime:{
        type:String
    },
    stertTime:{
        type:String
    }
},{timestamps:true})
const Discount=mongoose.model('Discount',discountCodeSchema)
export default Discount