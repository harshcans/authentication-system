const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express.use();
app.use(express.json);

const PORT = process.env.PORT || 5000;

app.get("/", (req,res) => {
    res.json({
        message: "Api running successfully"
    });
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});