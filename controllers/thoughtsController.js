const { Thoughts, User } = require("../models");

// Get all thoughts
const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thoughts.find().populate("users");
    res.json(thoughts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve thoughts", error: err });
  }
};

// Get a single thought by ID
const getSingleThought = async (req, res) => {
  try {
    const thought = await Thoughts.findById(req.params.thoughtsId).populate(
      "users"
    );
    if (!thought) {
      return res
        .status(404)
        .json({ message: "No thoughts found with that ID" });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving thought", error: err });
  }
};

// Create a new thought
const createThought = async (req, res) => {
  try {
    const newThought = await Thoughts.create(req.body);
    res.json(newThought);
  } catch (err) {
    res.status(500).json({ message: "Failed to create thought", error: err });
  }
};

// Delete a thought by ID
const deleteThought = async (req, res) => {
  try {
    const thought = await Thoughts.findByIdAndDelete(req.params.thoughtsId);
    if (!thought) {
      return res
        .status(404)
        .json({ message: "No thoughts found with that ID" });
    }
    await User.deleteMany({ _id: { $in: thought.users } });
    res.json({ message: "Thought and associated users deleted!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete thought", error: err });
  }
};

// Update a thought by ID
const updateThought = async (req, res) => {
  try {
    const updatedThought = await Thoughts.findByIdAndUpdate(
      req.params.thoughtsId,
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!updatedThought) {
      return res.status(404).json({ message: "No thought found with that ID" });
    }
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json({ message: "Failed to update thought", error: err });
  }
};

module.exports = {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
};
