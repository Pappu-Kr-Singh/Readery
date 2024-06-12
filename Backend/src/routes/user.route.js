import express from "express";
import {
  registerUser,
  loginUser,
  changeCurrentPassword,
} from "../controller/user.controller.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/change-password", changeCurrentPassword);

export default router;
