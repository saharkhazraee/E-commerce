import express from 'express'
import path from 'path'
import cors from 'cors'
import morgan from 'morgan'
import { fileURLToPath } from 'url'
import cartRouter from './Routes/cart.js'
import categoryRouter from './Routes/category.js'
import commentRouter from './Routes/comment.js'
import discountCodeRouter from './Routes/discountCode.js'
import orderHistoryRouter from './Routes/orderHistory.js'
import productRouter from './Routes/product.js'
import searchRouter from './Routes/search.js'
import sliderRouter from './Routes/slider.js'
import userRouter from './Routes/user.js'
import variantRouter from './Routes/variant.js'
import authRouter from './Routes/auth.js'
import HandleError from './Utils/handleError.js'
import catchError from './Utils/catchError.js'

const __filename=fileURLToPath(import.meta.url)
export const __dirname=path.dirname(__filename)
const app=express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static('Public'))
app.use('/api/cart',cartRouter)
app.use('/api/category',categoryRouter)
app.use('/api/comment',commentRouter)
app.use('/api/discountCode',discountCodeRouter)
app.use('/api/orderHistory',orderHistoryRouter)
app.use('/api/product',productRouter)
app.use('/api/search',searchRouter)
app.use('/api/slidr',sliderRouter)
app.use('/api/user',userRouter)
app.use('/api/variant',variantRouter)
app.use('/api/auth',authRouter)
app.use('*',(req,res,next)=>{
    next(new HandleError('route not found',404))
})
app.use(catchError)
export default app  