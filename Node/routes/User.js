import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import { userSignup, userLogin,updateUser } from "../controller/User";
import { CheckMail } from "../middleware/CheckMail";
import { upload } from "../middleware/uploadImage";

const router = express.Router();

router.post("/userSignup", upload.single('image'), userSignup);
router.post("/userLogin", userLogin);
router.post("/updateUser",verifyToken, updateUser);

export default router;
