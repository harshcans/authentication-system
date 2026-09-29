const express = require("express");
const protect = require("./authMiddleware");

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

router.get("/me", protect, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

module.exports = router;