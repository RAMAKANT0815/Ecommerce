import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import ErrorHandler from "../utils/handleError.js";
import handleAsyncError from "./handleAsyncError.js";

export const verifyUserAuth = handleAsyncError(async (req, res, next) => {

    // Get token from cookies
    const { token } = req.cookies;

    // Check if token exists
    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401));
    }

    // Verify token
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // Find user from database
    req.user = await User.findById(decodedData.id);

    next();
});

//authorization 
export const roleBasedAccess = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(
                    `Role: ${req.user.role} is not allowed to access this resource`,
                    403
                )
            );
        }

        next();
    };
};
