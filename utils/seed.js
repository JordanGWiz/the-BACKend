const connection = require("../config/connection");
const { Thoughts, User } = require("../models");

connection.on("error", (err) => console.error(err));

connection.once("open", async () => {
  console.log("Connected to the database");


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

 
  const thoughts = [
    {
      thoughtText: "Learning to code is an adventure!",
      username: "starryNights",
      reactions: [],
    },
    {
      thoughtText: "Tech innovations never cease to amaze me.",
      username: "codingGuru",
      reactions: [],
    },
    {
      thoughtText: "Traveling opens your mind to new possibilities.",
      username: "mysticTraveler",
      reactions: [],
    },
    {
      thoughtText: "Every day is a chance to learn something new.",
      username: "techExplorer",
      reactions: [],
    },
    {
      thoughtText: "Finding peace in the chaos of coding.",
      username: "zenithWalker",
      reactions: [],
    },
  ];

  const seedDatabase = async () => {
    try {
      // Delete existing data
      await User.deleteMany({});
      await Thoughts.deleteMany({});

      // Create users
      const createdUsers = await User.create(users);

      // Create thoughts and associate them with users
      const createdThoughts = await Thoughts.create(thoughts);

      // Add thoughts to users
      for (const thought of createdThoughts) {
        const user = await User.findOne({ username: thought.username });
        user.thoughts.push(thought._id);
        await user.save();
      }

      console.log("Database seeded successfully!");
    } catch (error) {
      console.error("Error seeding database:", error);
    }
  };

  await seedDatabase();

  
  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete!");
  process.exit(0);
});
