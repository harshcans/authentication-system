const express = require("express");

const {
    registerUser,
    verifyOtp,
    resendOtp,
    loginUser,
    refreshAccessToken,
    logoutUser
} = require("./authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginUser);
router.post("/resend-otp", resendOtp);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logoutUser);

module.exports = router;