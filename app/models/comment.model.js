
const db = require("../config/db.config");

const Comment = {
    create: (comment) => {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO comments (content, project_id, task_id) VALUES (?, ?, ?)`;
            db.run(sql, [comment.content, comment.project_id, comment.task_id], function (err) {
                if (err) reject(err);
                else resolve({ id: this.lastID });
            });
        });
    },

    findAll: () => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM comments`;
            db.all(sql, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },

    findById: (id) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM comments WHERE id = ?`;
            db.get(sql, [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },

    update: (id, comment) => {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE comments SET content = ? WHERE id = ?`;
            db.run(sql, [comment.content, id], function (err) {
                if (err) reject(err);
                else resolve(this.changes);
            });
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM comments WHERE id = ?`;
            db.run(sql, [id], function (err) {
                if (err) reject(err);
                else resolve(this.changes);
            });
        });
    },

    deleteAll: () => {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM comments`;
            db.run(sql, [], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    },
};

module.exports = Comment;
