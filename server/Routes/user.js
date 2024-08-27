import express from 'express'
import { getAllUSer, getOneUser, updateUser } from '../Controllers/userCn.js'
import isAdmin from '../Middleware/isAdmin.js'
import isLogin from '../Middleware/isLogin.js'
const userRouter=express.Router()
userRouter.route('/').get(isAdmin,getAllUSer)
userRouter.route('/:id').get(isLogin,getOneUser).patch(isLogin,updateUser)

export default userRouter