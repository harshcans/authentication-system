const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./db");
const authRoutes = require("./authRoutes");

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Authentication API is running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});