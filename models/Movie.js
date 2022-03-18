const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String },
    img: { type: String, required: true }, //background image
    imgTitle: { type: String, required: true }, //banner image small
    imgThumbnail: { type: String, required: true },

    trailer: { type: String, required: true },
    video: { type: String, required: true },
    year: { type: Number, required: true },
    duration: { type: String, required: true },
    ageLimit: { type: Number, required: true },

    genre: { type: String, required: true }, //action, comedy, etc.

    category: { type: String, enum: ["series", "movies"], default: "movies" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
