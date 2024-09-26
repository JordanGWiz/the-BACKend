const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  deleteReaction,
  createReaction,
} = require("../../controllers/thoughtsController");

router.route("/").get(getThoughts).post(createThoughts);

router
  .route("/:thoughtsId")
  .get(getSingleThought)
  .put(updateThoughts)
  .delete(deleteThoughts);

router.route("/:thoughtsId/reactions/:reactionId").delete(deleteReaction);

router.route("/:thoughtsId/reactions").post(createReaction);

module.exports = router;
