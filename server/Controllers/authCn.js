import User from "../Models/userMd.js";
import catchAsync from "../Utils/catchAsync.js";
import HandleError from "../Utils/handleError.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import {sendAuthCode, verifyCode} from "../Utils/smsHandler.js"
export const register = catchAsync(async (req, res, next) => {
    const { password, role = '', ...others } = req.body;
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g;
    if (!regex.test(password)) {
        return next(new HandleError('password invalid', 404))
    }
    const hashPassword = bcryptjs.hashSync(password, 10);
    const user = await User.create({ password: hashPassword, ...others })
    return res.status(200).json({
        status: 'success',
        data: user,
        message: 'register successfully'
    })
})
export const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const user=await User.findOne({email})
    const hashPassword=bcryptjs.compareSync(password,user.password)
    if(!hashPassword || !user){
        return next(new HandleError('invalid email or password', 401))
    }
    const token=jwt.sign({id:user._id,role:user.role,loginComplete:false,phone:user.phone},process.env.JWT_SECRET)
    const smsData=await sendAuthCode(user.phone)
    if(!smsData){
        return next(new HandleError(smsData.message,500))
    }
    return res.status(200).json({
        status:'success',
        data:token,
        message: "login successfully",
    })
})
export const otp = catchAsync(async (req, res, next) => {
 const {code}=req.body
 const {phone,id}=jwt.verify(req.headers.authorization.split(' ')[1],process.env.JWT_SECRET)
 const user=await User.findById(id)
 const smsDate=await verifyCode(phone,code)
 if(!smsDate){
    return next(new HandleError('invalid code',404))
 }
 const token=jwt.sign({id:user._id,role:user.role,loginComplete:true},process.env.JWT_SECRET)
 return res.status(200).json({
    status:'success',
    data:token,
    message: "otp successfully",

 })
})
export const sendSms = catchAsync(async (req, res, next) => {

})
export const changePassword = catchAsync(async (req, res, next) => {

})

