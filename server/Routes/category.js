import express from 'express'
import { createCategory, deleteCategory, getAllCategory, getOneCategory, updateCategory } from '../Controllers/categoryCn.js'
import isAdmin from '../Middleware/isAdmin.js'
import upload from '../Utils/UploadFile.js'

const categoryRouter=express.Router()
categoryRouter.route('/').get(getAllCategory).post(isAdmin,upload.single('file'),createCategory)
categoryRouter.route('/:id').get(isAdmin,getOneCategory).patch(isAdmin,upload.single('file'),updateCategory).delete(isAdmin,deleteCategory)


export default categoryRouter