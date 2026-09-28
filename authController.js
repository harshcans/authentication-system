const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const User = require("./userSchema");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }


    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOtp = await bcrypt.hash(otp, 10);

    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await User.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      otp: hashedOtp,
      otpExpiresAt,
      otpResendCount: 0,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Verification Code",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully. OTP sent to your email.",
    });
  } catch (error) {
    console.log(error);

    if (error.name === "ValidationError") {
      const message = Object.values(error.errors)
        .map((err) => err.message)
        .join(", ");

      return res.status(400).json({
        success: false,
        message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "User is already verified"
            });
        }

        if (!user.otp || !user.otpExpiresAt) {
            return res.status(400).json({
                success: false,
                message: "OTP not found. Please request a new OTP"
            });
        }

        if (new Date() > user.otpExpiresAt) {
            return res.status(400).json({
                success: false,
                message: "OTP has expired"
            });
        }

        const isOtpCorrect = await bcrypt.compare(
            otp,
            user.otp
        );

        if (!isOtpCorrect) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiresAt = undefined;
        user.otpResendCount = 0;

        await user.save();

        res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
  registerUser,
  verifyOtp,
};
