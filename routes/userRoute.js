const router = require("express").Router();
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUserStatistics,
  showCurrentUser,
} = require("../controllers/userController");
const {
  authenticateMiddleware,
  authorizePermissions,
} = require("../middlewares/authenticateMiddleware");

router
  .route("/")
  .get(authenticateMiddleware, authorizePermissions(true), getAllUsers);

router
  .route("/get-stat")
  .get(authenticateMiddleware, authorizePermissions(true), getUserStatistics);

router.route("/show-current-user").get(authenticateMiddleware, showCurrentUser);

router
  .route("/:id")
  .get(getUser)
  .patch(authenticateMiddleware, authorizePermissions(true), updateUser)
  .delete(authenticateMiddleware, authorizePermissions(true), deleteUser);

module.exports = router;
