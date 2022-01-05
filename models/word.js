const mongoose = require("mongoose");
const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("word", wordSchema);
