const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please provdide a valid email address"
    ]
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
    },

    otpExpiresAt: {
      type: Date,
    },

    otpResendCount: {
      type: Number,
      default: 0,
    },
    refreshToken: {
  type: String
}
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
