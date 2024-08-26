import catchAsync from "../Utils/catchAsync.js";
import jwt from "jsonwebtoken"
import HandleError from "../Utils/handleError.js";
const isAdmin = catchAsync(async (req, res, next) => {
    try {
        const { role } = jwt.verify(req.headers.authorizathion.split(" ")[1], process.env.JWT_SECRET)
        if (role !== "admin") {
            return next(new HandleError("you don't have permission", 401))
        }
        return next()
    } catch (error) {
        return next(new HandleError("you don't have permission", 401))
    }
})
export default isAdmin