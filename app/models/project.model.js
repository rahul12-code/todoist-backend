
const db = require("../config/db.config");

const Project = {
    create: (project) => {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO project (name, color, is_favorite,user_id) VALUES (?, ?, ?, ?)`;
            db.run(sql, [project.name, project.color, project.is_favorite,project.user_id], function (err) {
                if (err) reject(err);
                else resolve({ id: this.lastID });
            });
        });
    },

    findAll: () => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM project`;
            db.all(sql, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },

    findById: (id) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM project WHERE id = ?`;
            db.get(sql, [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },

    update: (id, project) => {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE project SET name = ?, color = ?, is_favorite = ? WHERE id = ?`;
            db.run(sql, [project.name, project.color, project.is_favorite, id], function (err) {
                if (err) reject(err);
                else resolve(this.changes);
            });
        });
    },

    updatePartial: (id, updates) => {
        return new Promise((resolve, reject) => {
            const setClause = Object.keys(updates)
                .map((key) => `${key} = ?`)
                .join(", ");
            const values = [...Object.values(updates), id];
            const sql = `UPDATE project SET ${setClause} WHERE id = ?`;
            db.run(sql, values, function (err) {
                if (err) reject(err);
                else resolve(this.changes);
            });
        });
    },    

    delete: (id) => {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM project WHERE id = ?`;
            db.run(sql, [id], function (err) {
                if (err) reject(err);
                else resolve(this.changes);
            });
        });
    },

    deleteAll: () => {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM project`;
            db.run(sql, [], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    },
};

module.exports = Project;
