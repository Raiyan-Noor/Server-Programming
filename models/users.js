const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  }
});

module.exports = mongoose.model("Users", userschema);
