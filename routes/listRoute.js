const router = require("express").Router();
const {
  createList,
  deleteList,
  getLists,
} = require("../controllers/listController");
const {
  authenticateMiddleware,
  authorizePermissions,
} = require("../middlewares/authenticateMiddleware");

router
  .route("/")
  .get(authenticateMiddleware, getLists)
  .post(authenticateMiddleware, authorizePermissions(true), createList);

router
  .route("/:id")
  .delete(authenticateMiddleware, authorizePermissions(true), deleteList);

module.exports = router;
