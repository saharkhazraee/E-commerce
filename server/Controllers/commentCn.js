import Comment from "../Models/commentMd.js";
import catchAsync from "../Utils/catchAsync.js";
import jwt from "jsonwebtoken"
import HandleError from "../Utils/handleError";
export const createComment = catchAsync(async (req, res, next) => {
    const { id: userId } = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET)
    const { content } = req.body
    const { productId } = req.params
    const newComment = await Comment.create({ userId, content, productId })
    return res.status(201).json({
        status: "success",
        message: "Comment created successfully",
        data: newComment

    })
})
export const getProductComment = catchAsync(async (req, res, next) => {
    const { productId } = req.params
    const comments = await Comment.find({ productId }).populate('userId')
    return res.status(201).json({
        status: "success",
        message: "Comment created successfully",
        data: comments

    })

})
export const deleteComment = catchAsync(async (req, res, next) => {
    const { id: userId, role: tokenRole } = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET)
    const {productId:commentId}=req.params
    const comment = await Comment.findById(commentId)
    if(tokenRole=="admin" || userId==comment.userId){
        await Comment.findByIdAndDelete(commentId)
    }else{
        return next(new HandleError("you don't have permission",401))
    }
    return res.status(200).json({
        status: "success",
        message: "Comment deleted successfully"
    })

})