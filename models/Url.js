const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortenedUrl: { type: String, required: true, unique: true },
  completeUrl: { type: String, required: true },
});

module.exports = mongoose.model("Url", urlSchema);
