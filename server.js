const express = require("express");
const dotenv = require("dotenv");
const db = require("./db.js");

dotenv.config();

const app = express.use();
app.use(express.json);

const port = process.env.PORT || 5000;

app.get("/", (req,res) => {
    res.json({
        message: "Api stared successfully"
    });
});


app.listen(PORT, () => {
    console.log(`PORT STARTED AT &{PORT}`)
});