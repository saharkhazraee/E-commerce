import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
    address: {
        type: String,
        required: [true, "address is required"]
    },
    city: {
        type: String,
        required: [true, "city is required"]
    },
    state: {
        type: String,
        required: [true, "state is required"]
    },
    country: {
        type: String,
        required: [true, "country is required"]
    },
    postalCode: {
        type: Number,
        required: [true, "postalCode is required"]
    }


})
const cartSchema = new mongoose.Schema({
    totalPrice: {
        type: Number,
        default: 0
    },
    items: {
        type: [{
            productVariant: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Productvariant",
                required: true
            },
            quantity:{
                type:Number,
                default:1
            }
        }],
        default: []
    }
})
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "fullName is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email exist"],
        match: [/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm, "invalid email"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [4, "password must be at least 8 characters"],
        maxlength: [8, "password must be at most 20 characters"],
    },
    phone: {
        type: String,
        required: [true, "phone is required"],
        match: [/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gm, "invalid phone number"]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    address: {
        type: addressSchema,
        required: [true, "address is required"]
    },
    cart: {
        type: cartSchema,
        required:[true,"cart is required"]
    }
}, { timestamps: true })
const User = mongoose.model('User', userSchema)
export default User