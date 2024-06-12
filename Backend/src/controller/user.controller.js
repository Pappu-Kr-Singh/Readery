import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import apiResponce from "../utils/ApiResponce.js";

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

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

  const user = await User.create({
    userName,
    email,
    password,
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

  const logedInUser = await User.findById(user._id).select("-password");

  return res
    .status(200)
    .json(new apiResponce(200, logedInUser, "User Logged in Successfully"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword) {
    throw new ApiError(401, "Old password is required");
  }

  if (!newPassword) {
    throw new ApiError(401, "New password is required");
  }

  if (!confirmPassword) {
    throw new ApiError(401, "Confirm Password is required");
  }

  if (!(newPassword === confirmPassword)) {
    throw new ApiError(401, "Confirm password doesn't match");
  }

  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new apiResponce(200, "Password is updated successfully"));
});

export { registerUser, loginUser, changeCurrentPassword };
