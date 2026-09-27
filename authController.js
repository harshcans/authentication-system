const bcrypt = require("bcryptjs");
const User = require("./userScheme");

const registerUser = async(req,res) => {
    try {
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Name,email and password are required"
            })

        }

        const existingUser = await User.findOne({email});

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        const hashedOtp = await bcrypt.hash(otp, 10);

        const otpExpiresAt = new Date(
            Date.now() + 5 * 60 * 1000
        );

        await User.create({
            name,
            email,
            password: hashedPassword,
            isVerified: false,
            otp: hashedOtp,
            otpExpiresAt
        })

                console.log("OTP:", otp);

        res.status(201).json({
            success: true,
            message: "User registered successfully. Please verify your OTP."
        });

        
    } catch(error) {
console.log(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

module.exports = {
    registerUser
};