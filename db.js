const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("DB successfully connected");
})
.catch((error) => {
    console.log("Mongodb connection failed" ,error.message)
});