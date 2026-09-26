const mongoose = require("mongoose");

const userScheme = new mongoose.scheme(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
  },
  {
    timestamps: true,
  },
);


module.exports = mongoose.model("User",userScheme)