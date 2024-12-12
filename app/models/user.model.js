
const db = require("../config/db.config");

const User = {
    create: (user) => {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO users (name, email) VALUES (?, ?)`;
            db.run(sql, [user.name, user.email], function (err) {
                if (err) reject(err);
                else resolve({ id: this.lastID });
            });
        });
    },

    findAll: () => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM users`;
            db.all(sql, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },

    findById: (id) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM users WHERE id = ?`;
            db.get(sql, [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },

    update: (id, user) => {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
            db.run(sql, [user.name, user.email, id], function (err) {
                if (err) reject(err);
                else resolve(this.changes);
            });
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM users WHERE id = ?`;
            db.run(sql, [id], function (err) {
                if (err) reject(err);
                else resolve(this.changes);
            });
        });
    },

    deleteAll: () => {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM users`;
            db.run(sql, [], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    },
};

module.exports = User;
