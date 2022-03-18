const Movie = require("../models/Movie");

const createMovie = async (req, res) => {
  const {
    title,
    description,
    duration,
    genre,
    video,
    year,
    img,
    trailer,
    ageLimit,
    category,
    imgTitle,
    imgThumbnail,
  } = req.body;
  if (
    !title ||
    !description ||
    !genre ||
    !duration ||
    !video ||
    !year ||
    !img ||
    !trailer ||
    !ageLimit ||
    !category ||
    !imgTitle ||
    !imgThumbnail
  ) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  const movie = await Movie.create(req.body);
  res.status(201).json({ msg: "Movie created successfully", data: movie });
};

const getMovies = async (req, res) => {
  const movies = await Movie.find().sort({ createdAt: -1 });
  res.status(200).json({ msg: "Movie found", data: movies });
};

const getMovie = async (req, res) => {
  const { id } = req.params;
  const movies = await Movie.find({ _id: id });
  if (!movies) {
    return res.status(404).json({ msg: "Movie not found" });
  }
  res.status(200).json({ msg: "Movie found", data: movies });
};

const getRandomMovie = async (req, res) => {
  //get random movie taking note of either movie or series
  const { type } = req.query;
  let movie;
  if (type === "series") {
    movie = await Movie.aggregate([
      {
        $match: { category: "series" },
      },
      //sample works like random in mongoose
      { $sample: { size: 1 } },
    ]);
  } else {
    movie = await Movie.aggregate([
      {
        $match: { category: "movies" },
      },
      //sample works like random in mongoose
      { $sample: { size: 1 } },
    ]);
  }
  res.status(200).json({ msg: "Movie found", data: movie });
};

const updateMovie = async (req, res) => {
  const updateMovie = await Movie.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  if (!updateMovie) {
    return res.status(404).json({ msg: "Movie not found" });
  }
  res
    .status(200)
    .json({ msg: "Movie updated successfully", data: updateMovie });
};

const deleteMovie = async (req, res) => {
  const deleteMovie = await Movie.findByIdAndDelete(req.params.id);
  if (!deleteMovie) {
    return res.status(404).json({ msg: "Movie not found" });
  }
  res
    .status(200)
    .json({ msg: "Movie updated successfully", data: deleteMovie });
};

module.exports = {
  createMovie,
  getRandomMovie,
  getMovies,
  getMovie,
  updateMovie,
  deleteMovie,
};
