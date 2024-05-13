import express from 'express';
import { LoggedInUser, changePassword, login, register, updateProfile } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';
import upload from '../file/upload.js';
const router = express.Router();

//register
router.route("/register").post(register);

//login
router.route("/login").post(login);

router.route("/single/user").get(isAuthenticated, LoggedInUser);

//update

router.route("/update/user").put(isAuthenticated, upload.single("avatar"), updateProfile)

//changepassword
router.route("/change/password").put(isAuthenticated,changePassword);

export default router;

