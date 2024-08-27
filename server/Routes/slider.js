import express from 'express'
import { createSlider, deleteSlider, getAllSlider } from '../Controllers/sliderCn.js'
import isAdmin from '../Middleware/isAdmin.js'
import upload from '../Utils/UploadFile.js'
const sliderRouter=express.Router()
sliderRouter.route('/').get(getAllSlider).post(isAdmin,upload.single('file'),createSlider)
sliderRouter.route('/:id').delete(isAdmin,deleteSlider)

export default sliderRouter