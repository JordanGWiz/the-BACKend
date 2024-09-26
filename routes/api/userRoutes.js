const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");


router.route("/").get(getUsers).post(createUser);


router
  .route("/:userId")
  .get(getSingleUser)
  .delete(deleteUser)
  .patch(updateUser);


router.route("/:userId/friend").post(addFriend);


router.route("/:userId/friend/:friendId").delete(removeFriend);

module.exports = router;
