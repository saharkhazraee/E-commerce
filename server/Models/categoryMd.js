import mongoose, { Schema } from "mongoose";
const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    image:{
        type:String,
        required:[true,'image is required']
    },
    subCategory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Category'
        }
    ]
},{timeseries:true})
const Category=mongoose.model('Category',categorySchema)
export default Category