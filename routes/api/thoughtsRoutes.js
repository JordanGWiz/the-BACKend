const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtsController.js");

// Get all thoughts or create a new thought
router
  .route("/")
  .get(getThoughts) 
  .post(createThoughts); 

//Get, update, or delete a specific thought
router
  .route("/:thoughtId")
  .get(getSingleThought) 
  .put(updateThoughts) 
  .delete(deleteThoughts); 

//Add or remove a reaction
router
  .route("/reactions/:reactionId")
  .post(createReaction) 
  .delete(deleteReaction); 

module.exports = router;
