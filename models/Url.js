import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true  },
  shortenedUrl: { type: String, required: true, unique: true , index: true},
  completeUrl: { type: String, required: true },
});

export default mongoose.model("Url", urlSchema);
