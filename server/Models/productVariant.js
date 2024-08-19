import mongoose from "mongoose";

const productVariantSchema=new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    variant:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Variant"
    }],
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    discount:{
        type:Number,
        default:0,
        min:0,
        max:100
    }
},{timestamps:true})
const ProductVariant=mongoose.model("ProductVariant",productVariantSchema)
export default ProductVariant