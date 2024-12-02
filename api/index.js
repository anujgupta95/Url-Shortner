const express = require("express");
const Url = require("../models/Url");
const dbConnect = require("../utils/dbConnect");

const app = express();
dbConnect();

app.get("*", async (req, res) => {
  // Get the full path (remove leading slash)
  const shortenedUrl = req.path.slice(1); // removes the leading "/"

  try {
    const urlEntry = await Url.findOne({ shortenedUrl });

    if (urlEntry) {
      return res.redirect(urlEntry.completeUrl);
    } else {
      return res.status(404).json({ message: "The requested URL does not exist" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = app;
