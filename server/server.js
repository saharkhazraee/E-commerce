import mongoose from "mongoose";
import dotenv from 'dotenv'
import app from "./app.js";
dotenv.config({path:'./confing.env'})
mongoose.connect(process.env.DATABASE_URL).then(()=>console.log("DB is connected")).catch(err=>console.log(err))
const port=process.env.PORT || 5001
app.listen(port,()=>console.log(`server is running on port ${port}`))