import User from "../models/userModel.js";
import path from "path";
import { join } from "path";
import fs from "fs";
import { unlink } from "fs/promises";
import ErrorHandle from "../utils/errorHandler.js";
import { tryCatchAsyncError } from "../middlewares/tryCatchAsyncError.js";

//register
export const register = tryCatchAsyncError(async (req, res, next) => {
  //postmen bata ...front bata pathauni
  const { fullName, email, mobileNo, password } = req.body;
  if (!fullName || !email || !mobileNo || !password) {
    return next(new ErrorHandle("Please provide required fields", 400));
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return next(new ErrorHandle("Please provide valid email", 400));
  }

  const exits = await User.findOne({ email });
  if (exits) {
    return next(new ErrorHandle("Email already exits", 400));
  }

  //create
  const user = await User.create({
    fullName,
    email,
    mobileNo,
    password,
  });

  res.status(201).json({
    success: true,
    message: "User create successfully",
    user,
  });
});

//login

export const login = tryCatchAsyncError(async (req, res, next) => {
    //fornt ko body
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandle("Please provide required fields", 400));
  }

  //valided email
  if (!/\S+@\S+\.\S+/.test(email)) {
    return next(new ErrorHandle("Please provide valid email", 400));
  }

  //mistake email --not same as database
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandle("Email dosenot exits", 400));
  }

  const isMatched = await user.comparePassword(password);
  if (!isMatched) {
    return next(new ErrorHandle("Invalid credentials!", 400));
  }

  const token = user.getJwtToken();
  res.status(200).json({
    success: true,
    message: "Login Successful!",
    user,
    token,
  });
});

//logged in user(profile/information)
export const LoggedInUser = tryCatchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorHandle("User not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "User get successfully",
    data:user,
  });
});

//updateprofile

export const updateProfile = tryCatchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    if (req.file) {
      await unlink(req.file.path);
    }
    return next(new ErrorHandle("User not found", 404));
  }
  const { fullName } = req.body;
  if (!fullName) {
    if (req.file) {
      await unlink(req.file.path);
    }

    return next(new ErrorHandle("field must be filled!", 400));
  }
  const existingImageUrl = user.avatar.url;
  const baseUrl = `${req.protocol}://${req.hostname}:${
    process.env.PORT || 4000
  }`;
  const avatarPath = req.file.filename;
  let avatarImageUrl;
  if (existingImageUrl) {
    const filename = path.basename(existingImageUrl);
    const previousAvatarPath = path.join("public", "gallery", filename);
    fs.unlinkSync(previousAvatarPath);
  }

  if (avatarPath) {
    avatarImageUrl = `${baseUrl}/gallery/${avatarPath}`.replace(/\\/g, "/") 
    // join(baseUrl, "gallery", avatarPath).replace(/\\/g, "/");
  }

  user.fullName = fullName;
  user.avatar = avatarImageUrl ? { url: avatarImageUrl } : undefined;

  await user.save();
  res.status(200).json({
    success: true,
    message: "Profile update successfully",
    data:user,
  });
});

//change password
export const changePassword = tryCatchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  if (!user) {
    return next(new ErrorHandle("User not found", 404));
  }
  //after id match body bata send garna lako data
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return next(new ErrorHandle("Filled must be filled", 400));
  }

  if (newPassword !== confirmPassword) {
    return next(new ErrorHandle("Password must be match", 400));
  }

  const isMatched = await user.comparePassword(oldPassword);
  if (!isMatched) {
    return next(new ErrorHandle("Old password is incorrect!", 400));
  }

  //now user can change password
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password change successfully",
  });
});
