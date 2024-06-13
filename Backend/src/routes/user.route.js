import express from "express";
import {
  registerUser,
  loginUser,
  changeCurrentPassword,
  refreshAccessToken,
} from "../controller/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = express.Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),

  registerUser
);

// router.post("/register", registerUser);
router.post("/login", loginUser);

// Secured Routes
// router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.post("/change-password", changeCurrentPassword);

export default router;
