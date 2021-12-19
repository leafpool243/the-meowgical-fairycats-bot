const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async () => {
    await mongoose.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return mongoose;
};