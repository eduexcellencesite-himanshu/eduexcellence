require("dotenv").config();

const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const User = require("../models/User");

const seedUsers = async () => {
  try {
    await connectDB();

    await User.deleteMany({});

    const adminPassword = await bcrypt.hash(
      "Admin@123",
      10
    );

    const editorPassword = await bcrypt.hash(
      "Editor@123",
      10
    );

    await User.insertMany([
      {
        name: "Super Admin",
        email: "admin@eduexcellence.com",
        password: adminPassword,
        role: "admin",
      },
      {
        name: "Content Editor",
        email: "editor@eduexcellence.com",
        password: editorPassword,
        role: "editor",
      },
    ]);

    console.log("Users Seeded Successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedUsers();