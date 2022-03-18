const router = require("express").Router();
const {
  createMovie,
  getMovies,
  getMovie,
  updateMovie,
  getRandomMovie,
  deleteMovie,
} = require("../controllers/movieController.js");

const {
  authenticateMiddleware,
  authorizePermissions,
} = require("../middlewares/authenticateMiddleware");

router
  .route("/")
  .get(authenticateMiddleware, authorizePermissions(true), getMovies)
  .post(authenticateMiddleware, authorizePermissions(true), createMovie);

router.get("/random-movie", getRandomMovie);

router
  .route("/:id")
  .get(getMovie)
  .patch(authenticateMiddleware, authorizePermissions(true), updateMovie)
  .delete(authenticateMiddleware, authorizePermissions(true), deleteMovie);

module.exports = router;
