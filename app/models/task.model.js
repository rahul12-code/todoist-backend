const db = require("../config/db.config");

const Task = {
  create: async (task) => {
    const sql = `INSERT INTO tasks (content, description, due_date, is_completed, project_id) 
                 VALUES ($1, $2, $3, $4, $5) RETURNING id`;
    const values = [task.content, task.description, task.due_date, task.is_completed, task.project_id];
    try {
      const result = await db.query(sql, values);
      return { id: result.rows[0].id };
    } catch (err) {
      throw err;
    }
  },

  findAll: async (filters) => {
    let sql = `SELECT id, content, description, due_date, is_completed, created_at, project_id FROM tasks WHERE 1=1`;
    const params = [];

    if (filters.project_id) {
      params.push(filters.project_id);
      sql += ` AND project_id = $${params.length}`;
    }
    if (filters.due_date) {
      params.push(filters.due_date);
      sql += ` AND due_date = $${params.length}`;
    }
    if (filters.is_completed !== undefined) {
      params.push(filters.is_completed);
      sql += ` AND is_completed = $${params.length}`;
    }
    if (filters.created_at) {
      params.push(filters.created_at);
      sql += ` AND created_at = $${params.length}`;
    }

    try {
      const result = await db.query(sql, params);
      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  findById: async (id) => {
    const sql = `SELECT * FROM tasks WHERE id = $1`;
    try {
      const result = await db.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },

  update: async (id, task) => {
    const sql = `UPDATE tasks SET content = $1, description = $2, due_date = $3, is_completed = $4 WHERE id = $5`;
    const values = [task.content, task.description, task.due_date, task.is_completed, id];
    try {
      const result = await db.query(sql, values);
      return result.rowCount;
    } catch (err) {
      throw err;
    }
  },

  delete: async (id) => {
    const sql = `DELETE FROM tasks WHERE id = $1`;
    try {
      const result = await db.query(sql, [id]);
      return result.rowCount;
    } catch (err) {
      throw err;
    }
  },

  deleteAll: async () => {
    const sql = `DELETE FROM tasks`;
    try {
      await db.query(sql);
    } catch (err) {
      throw err;
    }
  },
};

module.exports = Task;
