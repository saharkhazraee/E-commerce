import Category from "../Models/categoryMd.js";
import Product from "../Models/productMd.js";
import catchAsync from "../Utils/catchAsync.js";

export const search=catchAsync(async(req,res,next)=>{
    const {search}=req.body
    const productResult=await Product.find({name:{$regex:search}})
    const categoryResult=await Category.find({name:{$regex:search}})
     return res.status(200).json({productResult,categoryResult})

})
