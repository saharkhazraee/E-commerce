import Category from "../Models/categoryMd.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import catchAsync from "../Utils/catchAsync.js";
import HandleError from "../Utils/handleError.js";
import fs from 'fs'
import {__dirname} from '../app.js'

export const getAllCategory=catchAsync(async(req,res,next)=>{
    const features=new ApiFeatures(Category,req.query).filters().limitFields().paginate().populate().sort()
    const categories=await features.query
    return res.status(200).json({
        status:'success',
        data:categories
    })

})
export const getOneCategory=catchAsync(async(req,res,next)=>{
    const category=await Category.findById(req.params.id)
    if(!category){
        return next(new HandleError("category not found",404))
    }
    return res.status(200).json({
        status:'success',
        data:category
    })
})
export const createCategory=catchAsync(async(req,res,next)=>{
    const image=req?.file?.filename || ''
    if(image==""){
        return next(new HandleError("image is required",400))
    }
    const newCategory=await Category.create({image,...req.body})
    return res.status(200).json({
        status:'success',
        data:newCategory
    })
})
export const updateCategory=catchAsync(async(req,res,next)=>{
    const imageBody=req.body.image || ""
    const img=req?.file?.filename || ""
    let category
    if(img){
       const oldCategory=await Category.findById(req.params.id)
       category=await Category.findByIdAndUpdate(req.params.id,{image:img,...req.body},{new:true,runValidators:true})
       if(oldCategory.image){
        fs.unlinkSync( `${__dirname}/Public/${oldCategory.image}`)
       }
    }else if(imageBody=="delete"){
        const oldCategory=await Category.findById(req.params.id)
        category=await Category.findByIdAndUpdate(req.params.id,{image:"",...req.body},{new:true,runValidators:true})
       if(oldCategory.image){
        fs.unlinkSync( `${__dirname}/Public/${oldCategory.image}`)}

    }else{
        category=await Category.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    }
    return res.status(200).json({
        status:'success',
        data:category
    })
})
export const deleteCategory=catchAsync(async(req,res,next)=>{
    const deleteCategory=await Category.findByIdAndDelete(req.params.id)
    if(deleteCategory.image){
        fs.unlinkSync(`${__dirname}/Public/${deleteCategory.image}`)
    }
    return res.status(200).json({
        status:'success',
        data:deleteCategory,
      message:'delete successfully'
    })
})
