const { Schema, model } = require("mongoose");
const validator = require("validator");


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 20, 
      trim: true,
    },
    email: {
      type: String,
      required: true,
      maxlength: 20,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: (input) => `${input} is not a valid email address!`,
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thoughts", 
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
    id: false,
  }
);

// Virtual for friend count
userSchema.virtual("friendCount").get(function () {
  return this.friends.length; // Return number of friends
});

const User = model("User", userSchema);

module.exports = User;
