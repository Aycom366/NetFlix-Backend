const mongoose = require("mongoose");

//list of moviees
const ListSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true }, //horros, action, etc.
    category: { type: String, enum: ["movies", "series"] }, //movie or series

    genre: { type: String, required: true }, //action, comedy, etc.
    movie: [{ type: mongoose.Types.ObjectId, ref: "Movie" }], //array of movie objects
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", ListSchema);
