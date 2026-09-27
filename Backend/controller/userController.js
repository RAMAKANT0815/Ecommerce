import handleAsyncError from "../middleware/handleAsyncError.js";
import User from "../models/userModel.js";
import HandleError from "../utils/handleError.js";
import { sendToken } from "../utils/jwtToken.js";
import { v2 as cloudinary } from "cloudinary";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

// Register User
export const registerUser = handleAsyncError(async (req, res, next) => {
    console.log("INCOMING DATA FROM REACT:", req.body);
    const { name, email, password, avatar } = req.body;

    const myCloud = await cloudinary.uploader.upload(avatar, {
        folder: "avatar",
        width: 150,
        crop: "scale"
    });
    
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    });

    sendToken(user, 201, res);
});

// Login User
export const loginUser = handleAsyncError(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new HandleError("Please provide email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new HandleError("Invalid email or password", 401));
    }

    const isMatch = await user.verifyPassword(password);

    if (!isMatch) {
        return next(new HandleError("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
});

// Logout User
export const logoutUser = handleAsyncError(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });

});
//reset password
export const requestResetPasssword = handleAsyncError(async(req, res, next)=>{
    const {email} = req.body;
    const user = await User.findOne({ email });
    if(!user){
        return next(new HandleError("User not found", 404));
    }
    let resetToken;
    try{
        resetToken = user.getResetPasswordToken();
        await user.save({validateBeforeSave: false});
    }catch(error){
        return next(new HandleError("could not save the reset token plz try again", 500));
    }
    const resetPasswordURL = `http://localhost/api/v1/reset/${resetToken}`;
    const message = `Use the following link to reset your password:${resetPasswordURL}. \n\n this link will expire in 15min. \n\n If you didn't request a password reset, plz ignore this message.`;
    try{
        await sendEmail({
            email:user.email,
            subject:'Password Reset Request',
            message
        })
        res.status(200).json({
            success:true,
            message:`Email is sent to ${user.email} successfully`
        })
    }catch(error){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false})
        return next(new HandleError("Email couldn't be sent , plz try again later", 500))
    }
})
//reset password
export const resetPassword = handleAsyncError(async(req, res, next)=>{
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })
    if(!user){
        return next(new HandleError("Reset Password token is invalid or has been expired", 400));
    }
    const { password, confirmPassword } = req.body;
    if(password!=confirmPassword){
        return next(new HandleError("password dosen't match",400))
    }
    user.password=password;
    user.resetPasswordToken=undefined
    user.resetPasswordExpire=undefined
    await user.save();
    sendToken(user, 200, res);
})

//get user details
export const getUserDetails = handleAsyncError(async(req, res, next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    })
})

//update user password
export const updatePassword = handleAsyncError(async(req, res, next)=>{
    const user = await User.findById(req.user.id).select("+password");
    const {oldPassword, newPassword, confirmPassword} = req.body;
    const isMatch = await user.verifyPassword(oldPassword);
    if(!isMatch){
        return next(new HandleError("Old password is incorrect", 400));
    }
    if(newPassword!=confirmPassword){
        return next(new HandleError("New password and confirm password do not match", 400));
    }
    user.password = newPassword;
    await user.save();
    sendToken(user, 200, res);
})

//update user profile
export const updateProfile = handleAsyncError(async(req, res, next)=>{
    const { name, email } = req.body;
    const updateUserDetails = {
        name, email
    }
    const user = await User.findByIdAndUpdate(req.user.id, updateUserDetails,{
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user
    })
})

//admin getting user information
export const getAllUsers = handleAsyncError(async(req, res, next)=>{
    const users = await User.find();
    res.status(200).json({
        success:true,
        users
    })
})

//admin getting single user information
export const getSingleUser = handleAsyncError(async(req, res, next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new HandleError("User not found", 404));
    }
    res.status(200).json({
        success:true,
        user
    })
})

//admin updating user role
export const updateUserRole = handleAsyncError(async(req, res, next)=>{
    const { role } = req.body;
    const updateUserDetails = {
        role
    }
    const user = await User.findByIdAndUpdate(req.params.id, updateUserDetails,{
        new: true,
        runValidators: true
    })
    if(!user){
        return next(new HandleError("User not found", 404));
    }
    res.status(200).json({
        success: true,
        message: "User role updated successfully",
        user
    })
})

//admin deleting user
export const deleteUser = handleAsyncError(async(req, res, next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new HandleError("User not found", 404));
    }
    await user.remove();
    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    })
})

