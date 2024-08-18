import mongoose from "mongoose";
const orderSchema=new mongoose.Schema({
    //show product variant 
    items:{                    
        type:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"ProductVariant"
        }],
    },
    // 
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    paymentStatus:{
        type:String,
        enum:["success","failed"]
    },
    totalPrice:{
        type:Number,
        required:true,
    }
},{timestamps:true})
const Order=mongoose.model('Order',orderSchema)
export default Order