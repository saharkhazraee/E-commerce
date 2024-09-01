import express from 'express'
import {forgetPassword, login, newPassword, otp, register, sendSms, verifyOtpForgetPassword } from '../Controllers/authCn.js'
const authRouter=express.Router()
authRouter.route('/').post(login)
authRouter.route('/register').post(register)
authRouter.route('/otp').post(otp)
authRouter.route('/send-sms').post(sendSms)
authRouter.route('/forget-password').post(forgetPassword)
authRouter.route('/verify-password').post(verifyOtpForgetPassword)
authRouter.route('/change-password').post(newPassword)
export default authRouter