
const db = require("../config/db.config");

const Project = {
    create: (project) => {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO projects (name, color, is_favorite, user_id) VALUES (?, ?, ?, ?)`;
            db.run(sql, [project.name, project.color, project.is_favorite, project.user_id], function (err) {
                if (err){
                    console.error(`Error inserting project: ${err.message}`);
                    reject(err);
                } 
                else{
                    console.log(`Project inserted with ID: ${this.lastID}`);
                    resolve({ id: this.lastID });
                } 
            });
        });
    },

    findByUserId: (userId) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM projects WHERE user_id = ?`;
            db.all(sql, [userId], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },
      

    findAll: () => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM projects`;
            db.all(sql, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },

    findById: (id) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM projects WHERE id = ?`;
            db.get(sql, [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },

    update: (id, project) => {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE projects SET name = ?, color = ?, is_favorite = ? WHERE id = ?`;
            db.run(sql, [project.name, project.color, project.is_favorite, id], function (err) {
                if (err) reject(err);
                else resolve(this.changes);
            });
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM projects WHERE id = ?`;
            db.run(sql, [id], function (err) {
                if (err) reject(err);
                else resolve(this.changes);
            });
        });
    },

    deleteAll: () => {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM projects`;
            db.run(sql, [], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    },
};

module.exports = Project;
