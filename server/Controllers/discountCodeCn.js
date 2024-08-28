import Discount from "../Models/discountCodeMd.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import catchAsync from "../Utils/catchAsync.js";
import HandleError from "../Utils/handleError";

export const getAllDiscountCode=catchAsync(async(req,res,next)=>{
    const features=new ApiFeatures(Discount,req.query).filters().limitFields().paginate().populate().sort()
    const discount=features.query
    return res.status(200).json({
        status:"success",
        data:discount,
       
     })

})
export const createDiscountCode=catchAsync(async(req,res,next)=>{
 const newDiscount=await Discount.create(req.body)
 return res.status(200).json({
    status:"success",
    data:newDiscount,
    message:"discount code create"
 })   
})
export const deleteDiscountCode=catchAsync(async(req,res,next)=>{
    const deleteDiscount=await Discount.findByIdAndDelete(req.params.id)
    return res.status(200).json({
        status:"success",
        data:deleteDiscount,
        message:"discount code delete"
    })
})
export const checkDiscountCode=catchAsync(async(req,res,next)=>{
    const discount=await Discount.findOne({code:req.body.code})
    if(!discount){
        return next(new HandleError("discount code not found",400))
    }
    const now=new Date().getTime()
    if(now < discount.startTime){
     return next(new HandleError("discount code not started",404))
    }else if(now > discount.expiredTime){
        return next(new HandleError("discount code expired",404))
    }
    return res.status(200).json({
        status:"success",
        data:discount,
        message:'discount code valid'
    })

    
})