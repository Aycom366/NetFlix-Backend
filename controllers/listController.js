const List = require("../models/List");

const createList = async (req, res) => {
  const { title, category, genre } = req.body;
  if (!title || !category || !genre) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  let list = await List.create(req.body);
  list = await List.populate(list, {
    path: "movie",
    select: "-__v -createdAt -updatedAt",
  });
  res.status(201).json({ msg: "List created successfully", data: list });
};

const deleteList = async (req, res) => {
  const { id } = req.params;
  const list = await List.findByIdAndDelete(id);
  if (!list) {
    return res.status(404).json({ msg: "List not found" });
  }
  res.status(200).json({ msg: "List deleted successfully", data: list });
};

const getLists = async (req, res) => {
  const { category } = req.query; //series or movies
  const { genre } = req.query; //horros action etc.
  let list = [];
  //if either series or movies is clicked
  if (category) {
    if (genre) {
      list = await List.aggregate([
        {
          $sample: { size: 10 }, //get first 10
        },
        {
          $match: { category: category, genre: genre }, //where category = movie or series and genre = horror,actions or comedy
        },
      ]);
    } else {
      //if there is no genre selected right?
      list = await List.aggregate([
        {
          $sample: { size: 10 },
        },
        {
          $match: { category: category },
        },
      ]);
    }
  }
  //else we are on the home page
  else {
    list = await List.aggregate([
      // {
      //   $lookup: {
      //     from: "movies",
      //     localField: "movie",
      //     foreignField: "_id",
      //     as: "movieArray",
      //   },
      // },
      {
        $sample: { size: 10 },
      },
    ]);
  }
  list = await List.populate(list, {
    path: "movie",
    select: "-__v -createdAt -updatedAt",
  });
  res.status(200).json({ msg: "Lists found", data: list });
};

module.exports = {
  createList,
  deleteList,
  getLists,
};
