const { Schema, model } = require("mongoose");
const validator = require("validator");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      validate: {
        validator: validator.isEmail,
        message: (input) => `${input} is not a valid email address!`,
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model("User", userSchema);

module.exports = User;
