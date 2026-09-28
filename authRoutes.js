const express = require("express");

const {
    registerUser,
    verifyOtp,
    resendOtp,
    loginUser,
} = require("./authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginUser);
router.post("/resend-otp", resendOtp);

module.exports = router;