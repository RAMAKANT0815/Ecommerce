import express from "express";
import { registerUser, loginUser, logoutUser, resetPassword, requestResetPasssword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } from "../controller/userController.js";
import {roleBasedAccess, verifyUserAuth} from '../middleware/userAuth.js'

const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/reset/:token").post(resetPassword);
router.route("/password/forgot").post(requestResetPasssword)
router.route("/profile").post(verifyUserAuth,getUserDetails);
router.route("/password/update").put(verifyUserAuth,updatePassword);
router.route("/profile/update").put(verifyUserAuth,updateProfile);
router.route("/admin/users").get(verifyUserAuth, getAllUsers);
router.route("/admin/user/:id").get(verifyUserAuth, roleBasedAccess('admin'),getSingleUser).put(verifyUserAuth, roleBasedAccess('admin'), updateUserRole).delete(verifyUserAuth, roleBasedAccess('admin'), deleteUser);
export default router;