const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const User = require("./User");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 200,
    },
    username: {
      type: String,
      required: true,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
