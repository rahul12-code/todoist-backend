const pool = require("./app/config/db.config"); // Importing the existing DB config
const colorOptions = require("./ColorOptions");
const faker = require("faker");
const bcrypt = require("bcrypt");
const fs = require("fs");

const insertUsers = async (count) => {
  try {
    const query = `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)`;

    for (let i = 1; i <= count; i++) {
      const user = {
        firstName: `User${i}`,
        lastName: `Last${i}`,
        email: `user${i}@gmail.com`,
        password: `password${i}`,
      };

      // Write email and password to file
      const data = `Email: ${user.email}, Password: ${user.password}\n`;
      fs.appendFileSync("email_passwords.txt", data);

      try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(user.password, 10);

        // Insert into database
        await pool.query(query, [
          user.firstName,
          user.lastName,
          user.email,
          hashedPassword,
        ]);
        console.log(`User ${i} inserted.`);
      } catch (err) {
        console.error(`Error inserting user ${i}:`, err.message);
      }
    }

    console.log(`${count} users insertion process completed.`);
  } catch (err) {
    console.error("Error inserting users:", err.message);
  }
};

const insertProjects = async (count) => {
  try {
    const batchSize = 5; // rows per batch
    const query = `INSERT INTO projects (name, color, is_favorite, user_id) VALUES ($1, $2, $3, $4)`;

    for (let batchStart = 0; batchStart < count; batchStart += batchSize) {
      for (
        let i = batchStart;
        i < Math.min(batchStart + batchSize, count);
        i++
      ) {
        const randomColorLabel =
          colorOptions[Math.floor(Math.random() * colorOptions.length)].value;

        await pool.query(query, [
          `Project ${i + 1}`,
          randomColorLabel,
          i % 2 === 0 ? 1 : 0,
          faker.datatype.number({ min: 1, max: 5 }), // 5 Users
        ]);
      }
    }

    console.log(`${count} projects inserted.`);
  } catch (err) {
    console.error("Error inserting projects:", err.message);
  }
};

const insertTasks = async (count) => {
  try {
    const batchSize = 25; // rows per batch
    const query = `INSERT INTO tasks (content, description, due_date, project_id) VALUES ($1, $2, $3, $4)`;

    for (let batchStart = 0; batchStart < count; batchStart += batchSize) {
      for (
        let i = batchStart;
        i < Math.min(batchStart + batchSize, count);
        i++
      ) {
        await pool.query(query, [
          `Task Content ${i + 1}`,
          `Task Description ${i + 1}`,
          faker.date.future().toISOString().split("T")[0],
          faker.datatype.number({ min: 1, max: 10 }), // 10 projects
        ]);
      }
    }

    console.log(`${count} tasks inserted.`);
  } catch (err) {
    console.error("Error inserting tasks:", err.message);
  }
};

const seedDatabase = async () => {
  try {
    console.log("Seeding database...");

    // Uncomment to run the seeding
    // await insertUsers(5); // 5 Users
    // await insertProjects(10); // 10 Projects
    await insertTasks(100); // 100 Tasks

    console.log("Seeding completed!");
    pool.end(); // Close the connection after seeding
  } catch (err) {
    console.error("Error seeding database:", err.message);
  }
};

seedDatabase();
