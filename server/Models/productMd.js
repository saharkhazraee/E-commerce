import mongoose from "mongoose";
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        trim:true
    },
    image:{
        type:String,
        required:[true,"image is required"],
    },
    description:{
        type:String,
        required:[true,"description is required"],
        trim:true
    },
    variant:[{
        type:mongoose.Schema.Types.ObjectId,
        Ref:"ProductVariant"
    }],
    defaultVariant:{
        type:mongoose.Schema.Types.ObjectId,
        Ref:"ProductVariant"
    }
},{timestamps:true})
const Product=mongoose.model("Product",productSchema)
export default Product