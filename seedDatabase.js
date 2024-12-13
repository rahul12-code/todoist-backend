
const sqlite3 = require("sqlite3").verbose();
const faker = require("faker");

const db = new sqlite3.Database('database.sqlite', (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
        return;
    }
    console.log("Connected to SQLite database.");
});

const insertUsers = (count) => {
    return new Promise((resolve) => {
        db.serialize(() => {
            const stmt = db.prepare(`INSERT INTO users (name, email) VALUES (?, ?)`);
            for (let i = 0; i < count; i++) {
                stmt.run(
                    `User${i}`, 
                    `user${i}@gmail.com` 
                );
            }
            stmt.finalize(() => {
                console.log(`${count} users inserted.`);
                resolve();
            });
        });
    });
};

const insertProjects = (count) => {
    const batchSize = 250; // rows per batch
    console.time("insertProjectsTime");
    return new Promise((resolve) => {
        db.serialize(() => {
            for (let batchStart = 0; batchStart < count; batchStart += batchSize) {
                const values = [];
                const placeholders = [];
                for (let i = batchStart; i < Math.min(batchStart + batchSize, count); i++) {
                    values.push(
                        `Project${i}`, 
                        faker.commerce.color(), 
                        i % 2 === 0, 
                        faker.datatype.number({ min: 1, max: 100 }));  // 100 Users

                    placeholders.push("(?, ?, ?, ?)");
                }
                const query = `INSERT INTO project (name, color, is_favorite, user_id) VALUES ${placeholders.join(",")}`;
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
    const batchSize = 250; // rows per batch
    console.time("insertTasksTime");
    return new Promise((resolve) => {
        db.serialize(() => {
            for (let batchStart = 0; batchStart < count; batchStart += batchSize) {
                const values = [];
                const placeholders = [];
                for (let i = batchStart; i < Math.min(batchStart + batchSize, count); i++) {
                    values.push(
                        `Task Content ${i}`,
                        `Task Description ${i}`,
                        faker.date.future().toISOString().split('T')[0],
                        i % 2 === 0,
                        faker.datatype.number({ min: 1, max: 1000000 }) // 1 million projects
                    );
                    placeholders.push("(?, ?, ?, ?, ?)");
                }
                const query = `INSERT INTO tasks (content, description, due_date, is_completed, project_id) VALUES ${placeholders.join(",")}`;
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

        // await insertUsers(100); // 100 Users
        // await insertProjects(1000000); // 10,00,000 Projects
        await insertTasks(10000000); // 1,00,00,000 Tasks

        console.log("Seeding completed!");
        db.close();
    } catch (err) {
        console.error("Error seeding database:", err.message);
    }
};

seedDatabase();
//module.exports = seedDatabase;