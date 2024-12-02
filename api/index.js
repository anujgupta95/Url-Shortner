const express = require("express");
const Url = require("../models/Url");
const dbConnect = require("../utils/dbConnect");

const app = express();
dbConnect();

// Capture all routes and use the full path as `shortenedUrl`
app.get("*", async (req, res) => {
  // Get the full path (remove leading slash)
  const shortenedUrl = req.path.slice(1); // removes the leading "/"

  try {
    // Find the entry in the database
    const urlEntry = await Url.findOne({ shortenedUrl });

    if (urlEntry) {
      // Redirect to the complete URL
      return res.redirect(urlEntry.completeUrl);
    } else {
      return res.status(404).json({ message: "The requested URL does not exist" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

module.exports = app;
