const mongoose = require("mongoose");
const textModel = mongoose.Schema({
    text: {
        type: String,
        require: true
    },

}, { timeStamps: true });

module.exports = mongoose.model("Text", textModel);