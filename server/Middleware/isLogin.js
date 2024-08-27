import catchAsync from "../Utils/catchAsync.js";
import jwt from "jsonwebtoken"
import HandleError from "../Utils/handleError.js";
const isLogin = catchAsync(async (req, res, next) => {
    try {
        const {loginComplete } = jwt.verify(req.headers.authorizathion.split(" ")[1], process.env.JWT_SECRET)
        if (!loginComplete) {
            return next(new HandleError("your login is not complete", 401))
        }
        return next()
    } catch (error) {
        return next(new HandleError("you don't have permission pls login", 401))
    }
})
export default isLogin