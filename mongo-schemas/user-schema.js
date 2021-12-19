const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    test: String
});

module.exports = mongoose.model("users", userSchema);