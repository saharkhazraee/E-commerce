import Slider from "../Models/sliderMd.js";
import catchAsync from "../Utils/catchAsync.js";
import HandleError from "../Utils/handleError.js";
import fs from "fs"

export const getAllSlider=catchAsync(async(req,res,next)=>{
    const sliders=await Slider.find()
    return res.status(200).json({
        status:'success',
        data:sliders
    })
})
export const createSlider=catchAsync(async(req,res,next)=>{
    const image=req?.file?.filename || ""
    if(image==""){
        return next(new HandleError("image is reguired"),400)
    }
    const newSlider=await Slider.create({image,...req.body})
    return res.status(201).json({
        status:'success',
        data:newSlider
    })
})
export const deleteSlider=catchAsync(async(req,res,next)=>{
    const deleteSlider=await Slider.findByIdAndDelete(req.params.id)
    fs.unlinkSync(`${__dirname}/Public/${deleteSlider.image}`)
    return res.status(200).json({
        status:'success',
        message:"delete successfully"
    })
})