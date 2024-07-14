const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  category: { type: String, required: true },
  comments: { type: String, required: true },
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
