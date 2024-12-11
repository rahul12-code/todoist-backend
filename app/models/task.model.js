
const db = require("../config/db.config");

const Task = {
  create: (task) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO tasks (content, description, due_date, is_completed, project_id) VALUES (?, ?, ?, ?, ?)`;
      db.run(
        sql,
        [
          task.content,
          task.description,
          task.due_date,
          task.is_completed,
          task.project_id,
        ],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID });
        }
      );
    });
  },

  findAll: (filters) => {
    return new Promise((resolve, reject) => {
      let sql = `SELECT id, content, description, due_date, is_completed, created_at, project_id FROM tasks WHERE 1=1`;
      const params = [];

      if (filters.project_id) {
        sql += ` AND project_id = ?`;
        params.push(filters.project_id);
      }
      if (filters.due_date) {
          sql += ` AND due_date = ?`;
          params.push(filters.due_date);
      }
      if (filters.is_completed !== undefined) {
          sql += ` AND is_completed = ?`;
          params.push(filters.is_completed);
      }
      if (filters.created_at) {
          sql += ` AND created_at = ?`;
          params.push(filters.created_at);
      }

      db.all(sql, params , (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM tasks WHERE id = ?`;
      db.get(sql, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  update: (id, task) => {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE tasks SET content = ?, description = ?, due_date = ?, is_completed = ? WHERE id = ?`;
      db.run(
        sql,
        [task.content, task.description, task.due_date, task.is_completed, id], function (err) {
          if (err) reject(err);
          else resolve(this.changes);
          console.log(this);
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM tasks WHERE id = ?`;
      db.run(sql, [id], function (err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  },

  deleteAll: () => {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM tasks`;
      db.run(sql, [], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  },
};

module.exports = Task;
