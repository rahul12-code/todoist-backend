const colorOptions = require("./ColorOptions");
const sqlite3 = require("sqlite3").verbose();
const faker = require("faker");

const bcrypt = require("bcrypt");
const fs = require('fs');

const db = new sqlite3.Database("database.sqlite", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
    return;
  }
  console.log("Connected to SQLite database.");
});


const insertUsers = async (count) => {
  return new Promise((resolve) => {
    db.serialize(async () => {
      const query = `INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;
      
      for (let i = 1; i <= count; i++) {
        const user = {
          firstName: `User${i}`,
          lastName: `Last${i}`,
          email: `user${i}@gmail.com`,
          password: `password${i}`,
        };

        // Write email and password to file
        const data = `Email: ${user.email}, Password: ${user.password}\n`;
        fs.appendFileSync('email_passwords.txt', data);

        try {
          // Hash the password
          const hashedPassword = await bcrypt.hash(user.password, 10);

          // Insert into database
          db.run(
            query,
            [user.firstName, user.lastName, user.email, hashedPassword],
            (err) => {
              if (err) {
                console.error(`Error inserting user ${i}:`, err.message);
              } else {
                console.log(`User ${i} inserted.`);
              }
            }
          );
        } catch (err) {
          console.error(`Error hashing password for user ${i}:`, err.message);
        }
      }
      console.log(`${count} users insertion process completed.`);
      resolve();
    });
  });
};


const insertProjects = (count) => {
  const batchSize = 250; // rows per batch
  // const batchSize = 5; // rows per batch
  return new Promise((resolve) => {
    db.serialize(() => {
      for (let batchStart = 0; batchStart < count; batchStart += batchSize) {
        const values = [];
        const placeholders = [];
        for (
          let i = batchStart;
          i < Math.min(batchStart + batchSize, count);
          i++
        ) {
          const randomColorLabel =
            colorOptions[Math.floor(Math.random() * colorOptions.length)].value;

          values.push(
            `Project ${i + 1}`,
            randomColorLabel,
            i % 2 === 0 ? 1 : 0,
            faker.datatype.number({ min: 1, max: 1000 }) // 1000 Users
          );
          placeholders.push("(?, ?, ?, ?)");
        }
        const query = `INSERT INTO projects (name, color, is_favorite, user_id) VALUES ${placeholders.join(
          ","
        )}`;
        db.run(query, values, (err) => {
          if (err) console.error("Error inserting batch:", err.message);
        });
      }
      console.log(`${count} projects inserted.`);
      resolve();
    });
  });
};

const insertTasks = (count) => {
  const batchSize = 250; // rows per batch
  return new Promise((resolve) => {
    db.serialize(() => {
      for (let batchStart = 0; batchStart < count; batchStart += batchSize) {
        const values = [];
        const placeholders = [];
        for (
          let i = batchStart;
          i < Math.min(batchStart + batchSize, count);
          i++
        ) {
          values.push(
            `Task Content ${i + 1}`,
            `Task Description ${i + 1}`,
            faker.date.future().toISOString().split("T")[0],
            // i % 2 === 0,
            faker.datatype.number({ min: 1, max: 1000000}) // 1 million projects
          );
          
          placeholders.push("(?, ?, ?, ?)");
        }
        const query = `INSERT INTO tasks (content, description, due_date, project_id) VALUES ${placeholders.join(
          ","
        )}`;
        db.run(query, values, (err) => {
          if (err) console.error("Error inserting batch:", err.message);
        });
      }
      console.log(`${count} tasks inserted.`);
      resolve();
    });
  });
};

const seedDatabase = async () => {
  try {
    console.log("Seeding database...");

    // await insertUsers(1000); // 1000 Users
    // await insertProjects(1000000); // 10,00,000 Projects
    // await insertTasks(10000000); // 1,00,00,000 Tasks

    console.log("Seeding completed!");
    db.close();
  } catch (err) {
    console.error("Error seeding database:", err.message);
  }
};

// seedDatabase();
