
const db = require("../config/db.config");

const User = {
    create: (user) => {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;
            db.run(sql, [user.first_name, user.last_name, user.email, user.password], function (err) {
                if (err) reject(err);
                else resolve({ id: this.lastID });
            });
        });
    },

    findByEmail: (email) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM users WHERE email = ?`;
            db.get(sql, [email], (err, row) => {
                if (err) reject(err);
                else resolve(row);
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
