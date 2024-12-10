
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database('./database.sqlite',(err)=>{
    if (err){
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to SQLite database.");

        // Enable foreign key constraints
        db.run('PRAGMA foreign_keys = ON;', (pragmaErr) => {
            if (pragmaErr) {
                console.error("Failed to enable foreign keys:", pragmaErr.message);
            } else {
                console.log("Foreign keys enabled.");
            }
        });

        db.run(
            `CREATE TABLE IF NOT EXISTS project (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               name TEXT,
               color TEXT,
               is_favorite INTEGER DEFAULT 0
             )`
        );
 
        db.run(
            `CREATE TABLE IF NOT EXISTS tasks (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               content TEXT,
               description TEXT,
               due_date DATE,
               is_completed INTEGER DEFAULT 0,
               created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
               project_id INTEGER,
               FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE
            )`
        );
    }
})

module.exports = db;