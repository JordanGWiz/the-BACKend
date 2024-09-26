const { User, Thoughts } = require("../models");

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a single user by ID
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("thoughts")
      .populate("friends")
      .select("-__v");
    if (!user) return res.status(404).json({ message: "No user with that ID" });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a user and their thoughts
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) return res.status(404).json({ message: "No user found" });

    const thoughts = await Thoughts.updateMany(
      { users: req.params.userId },
      { $pull: { users: req.params.userId } }
    );

    if (!thoughts)
      return res.status(404).json({ message: "No thoughts found" });

    res.json({ message: "User and thoughts successfully deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update user details
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { runValidators: true, new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Add a friend to a user
const addFriend = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    );
    if (!user) return res.status(404).json({ message: "No user found" });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Remove a friend from a user
const removeFriend = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: { friendId: req.params.friendId } } },
      { runValidators: true, new: true }
    );
    if (!user) return res.status(404).json({ message: "No user found" });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend,
};
