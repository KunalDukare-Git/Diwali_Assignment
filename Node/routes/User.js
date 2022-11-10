import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import { userSignup, userLogin, updateUser, forgetPassword, resetPassword } from "../controller/User";
import { CheckMail } from "../middleware/CheckMail";
import { upload } from "../middleware/uploadImage";
import { findMail } from "../middleware/findMail";

const router = express.Router();

router.post("/userSignup", [upload.single('image'), CheckMail], userSignup);
router.post("/userLogin", userLogin);
router.post("/updateUser", verifyToken, updateUser);
router.post("/forgetPassword", findMail, forgetPassword);
router.post("/resetPassword", verifyToken, resetPassword);

export default router;
