import express from 'express'
import { changePassword, login, otp, register, sendSms } from '../Controllers/authCn.js'
const authRouter=express.Router()
authRouter.route('/').post(login)
authRouter.route('/register').post(register)
authRouter.route('/otp').post(otp)
authRouter.route('/send-sms').post(sendSms)
authRouter.route('/change-password').post(changePassword)
export default authRouter