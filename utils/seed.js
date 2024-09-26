const connection = require("../config/connection");
const { Thoughts, User } = require("../models");

connection.on("error", (err) => console.error(err));

connection.once("open", async () => {
  console.log("Connected to the database");

  // Seed data for users
  const users = [
    {
      username: "starryNights",
      email: "starry.nights@example.com",
    },
    {
      username: "codingGuru",
      email: "coding.guru@example.com",
    },
    {
      username: "mysticTraveler",
      email: "mystic.traveler@example.com",
    },
    {
      username: "techExplorer",
      email: "tech.explorer@example.com",
    },
    {
      username: "zenithWalker",
      email: "zenith.walker@example.com",
    },
  ];

  // Seed data for thoughts
  const thoughts = [
    {
      thoughtText: "Learning to code is an adventure!",
      username: "starryNights",
    },
    {
      thoughtText: "Tech innovations never cease to amaze me.",
      username: "codingGuru",
    },
    {
      thoughtText: "Traveling opens your mind to new possibilities.",
      username: "mysticTraveler",
    },
    {
      thoughtText: "Every day is a chance to learn something new.",
      username: "techExplorer",
    },
    {
      thoughtText: "Finding peace in the chaos of coding.",
      username: "zenithWalker",
    },
  ];

  // Log out the seed data
  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete!");

  process.exit(0);
});
