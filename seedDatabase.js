const colorOptions = require("./ColorOptions");

const sqlite3 = require("sqlite3").verbose();
const faker = require("faker");

const db = new sqlite3.Database("database.sqlite", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
    return;
  }
  console.log("Connected to SQLite database.");
});

const insertUsers = (count) => {
  return new Promise((resolve) => {
    db.serialize(() => {
      const query = `INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;
      for (let i = 1; i < count + 1; i++) {
        const user = {
          firstName: `User${i}`,
          lastName: `Last${i}`,
          email: `user${i}@gmail.com`,
          password: `password${i}`,
        };
        db.run(
          query,
          [user.firstName, user.lastName, user.email, user.password],
          (err) => {
            if (err) console.error(`Error inserting user ${i}:`, err.message);
          }
        );
      }
      console.log(`${count} users inserted.`);
      resolve();
    });
  });
};

const insertProjects = (count) => {
  //   const batchSize = 250; // rows per batch
  const batchSize = 5; // rows per batch
  console.time("insertProjectsTime");
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
            // faker.datatype.number({ min: 1, max: 100 }) // 100 Users
            faker.datatype.number({ min: 1, max: 5 })
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
      console.timeEnd("insertProjectsTime");
      console.log(`${count} projects inserted.`);
      resolve();
    });
  });
};

const insertTasks = (count) => {
  //   const batchSize = 250; // rows per batch
  const batchSize = 10; // rows per batch
  console.time("insertTasksTime");
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
            faker.datatype.number({ min: 1, max: 10 }) // 1 million projects
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
      console.timeEnd("insertTasksTime");
      console.log(`${count} tasks inserted.`);
      resolve();
    });
  });
};

const seedDatabase = async () => {
  try {
    console.log("Seeding database...");

    // await insertUsers(5); // 100 Users
    // await insertProjects(10); // 10,00,000 Projects
    // await insertTasks(100); // 1,00,00,000 Tasks

    console.log("Seeding completed!");
    db.close();
  } catch (err) {
    console.error("Error seeding database:", err.message);
  }
};

// seedDatabase();
