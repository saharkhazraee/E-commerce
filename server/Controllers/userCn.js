import User from "../Models/userMd.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import catchAsync from "../Utils/catchAsync.js";
import HandleError from "../Utils/handleError.js";
import jwt from "jsonwebtoken"

export const getAllUSer = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(User, req.query).filters().limitFields().paginate().populate().sort()
    const users = await features.query();
    return res.status(200).json({
        status: "success",
        data: users
    })
})
export const getOneUser=catchAsync(async(req,res,next)=>{
    const user=await User.findById(req.params.id)
    if(!user){
        return next(new HandleError("user not found",404))
    }
    return res.status(200).json({
        status:"success",
        data:user
    })
})
export const updateUser = catchAsync(async (req, res, next) => {
    const{role:tokenRole,id:userId}=jwt.verify(req.headers.authorization.split(" ")[1],process.env.JWT_SECRET)
    const {id}=req.params
    let user;
    if(tokenRole=="admin" || userId==id){
        if(tokenRole=="admin"){
             user = await User.findByIdAndUpdate(id, req.body,{new:true})
        }else{
       const {role,...others}=req.body
        user = await User.findByIdAndUpdate(id, others,{new:true})
        }

    }else{
        return next(new HandleError("you dont have permission to update this user",401))
    }
    return res.status(200).json({
        status:'success',
        data:user,
        message:"user is updated"
    })
})