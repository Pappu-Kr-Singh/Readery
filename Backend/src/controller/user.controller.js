import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import apiResponce from "../utils/ApiResponce.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken; // to add refresh token in mongodb
    await user.save({ validateBeforeSave: false }); // don't do validation here because there's no need

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating Refressh and Acess Token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { userName, fullName, email, password } = req.body;

  if (
    ![userName, fullName, email, password].every(
      (field) => typeof field === "string" && field.trim() !== ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //checking @ in email
  const emailValidate = email.includes("@");

  if (!emailValidate) {
    throw new ApiError(400, "email is not correct");
  }

  //Validating already existed user
  const userNameExist = await User.findOne({ userName });
  const userEmailExit = await User.findOne({ email });

  if (userNameExist) {
    // throw new ApiError(408, "userName Already Exist");
    return res.status(408).json({ message: " userName already exists" });
  }

  if (userEmailExit) {
    // throw new ApiError(408, "Email Already Exit");
    return res.status(408).json({ message: " Email Already Exists" });
  }

  // Cheking avatar image
  const avatarLocalPath = req.files?.avatar[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(401, "Avatar File is required");
  }

  let avatar;
  try {
    avatar = await uploadOnCloudinary(avatarLocalPath);
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new ApiError(500, "Error while uploading the avatar to Cloudinary");
  }

  if (!avatar) {
    throw new ApiError(500, "Error while uploading the avatar to Cloudinary");
  }

  const user = await User.create({
    fullName,
    email,
    password,
    avatar: avatar.url,
    userName: userName.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError("something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new apiResponce(200, createdUser, "User registerd Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // get user details
  // username or email
  // find user
  // password check
  // access and refresh token
  // send cookie

  const { userName, email, password } = req.body;

  if (!(userName || email)) {
    throw new ApiError(400, "userName or email is required");
  }

  const user = await User.findOne({
    $or: [{ userName }, { email }],
  });

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    // throw new ApiError(401, "Invalid User Credientials");
    return res.status(401).json({ message: " Invalid User Credientials" });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const logedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponce(
        200,
        {
          user: logedInUser,
          accessToken,
          refreshToken,
        },
        "User Loggin Successfully"
      )
    );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unAuthorized access");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "invalid refreshToken");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("AccessToken", accessToken, options)
      .cookie("RefreshToken", newRefreshToken, options)
      .json(
        new apiResponce(200),
        { accessToken, refreshToken: newRefreshToken },
        "Access Token Refreshed Successfully"
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh Token");
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  console.log("Current User Avatar ", req.user.avatar);
  return res
    .status(200)
    .json(new apiResponce(200, req.user, "Current user Fetched Seccessfullly"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  console.log(oldPassword, newPassword, confirmNewPassword);

  if (!(newPassword === confirmNewPassword)) {
    throw new ApiError(401, "Confirm password doesn't match");
  }

  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

export {
  registerUser,
  loginUser,
  changeCurrentPassword,
  getCurrentUser,
  refreshAccessToken,
};
