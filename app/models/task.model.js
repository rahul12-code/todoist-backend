

const db = require("../config/db.config");

const Task = {
  create: (task, callback) => {
    const sql = `INSERT INTO tasks (content, description, due_date, is_completed, project_id) VALUES (?, ?, ?, ?, ?)`;
    db.run(
      sql,
      [task.content, task.description, task.due_date, task.is_completed, task.project_id],
      function (err) {
        callback(err, { id: this.lastID });
      }
    );
  },

  findAll: (callback) => {
    const sql = `SELECT id, content, description, due_date, is_completed, created_at, project_id FROM tasks`;
    db.all(sql, [], callback);
  },

  findById: (id, callback) => {
    const sql = `SELECT * FROM tasks WHERE id = ?`;
    db.get(sql, [id], callback);
  },

  update: (id, task, callback) => {
    const sql = `UPDATE tasks SET content = ?, description = ?, due_date = ?, is_completed = ? WHERE id = ?`;
    db.run(
      sql,
      [task.content, task.description, task.due_date, task.is_completed, id],
      callback
    );
  },

  delete: (id, callback) => {
    const sql = `DELETE FROM tasks WHERE id = ?`;
    db.run(sql, [id], callback);
  },

  deleteAll: (callback) => {
    const sql = `DELETE FROM tasks`;
    db.run(sql, [], callback);
  },
};

module.exports = Task;
