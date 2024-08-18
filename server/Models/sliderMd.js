import mongoose from "mongoose";
const sliderSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    image:{
        type:String,
        required:[true,"image is required"]
    },
    href:{
        type:String
    }
},{timestamps:true})
const Slider=mongoose.model('Slider',sliderSchema)
export default Slider