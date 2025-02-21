const pool = require("../config/db.config");

const User = {
  create: async (user) => {
    const query = `INSERT INTO users (first_name, last_name, email, password) 
                   VALUES ($1, $2, $3, $4) RETURNING id`;
    const values = [user.first_name, user.last_name, user.email, user.password];
    try {
      const result = await pool.query(query, values);
      return { id: result.rows[0].id };
    } catch (err) {
      throw err;
    }
  },

  findByEmail: async (email) => {
    const query = `SELECT * FROM users WHERE email = $1`;
    try {
      const result = await pool.query(query, [email]);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },

  findAll: async () => {
    const query = `SELECT * FROM users`;
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  findById: async (id) => {
    const query = `SELECT * FROM users WHERE id = $1`;
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },

  update: async (id, user) => {
    const query = `UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4`;
    const values = [user.first_name, user.last_name, user.email, id];
    try {
      const result = await pool.query(query, values);
      return result.rowCount;
    } catch (err) {
      throw err;
    }
  },

  delete: async (id) => {
    const query = `DELETE FROM users WHERE id = $1`;
    try {
      const result = await pool.query(query, [id]);
      return result.rowCount;
    } catch (err) {
      throw err;
    }
  },

  deleteAll: async () => {
    const query = `DELETE FROM users`;
    try {
      await pool.query(query);
    } catch (err) {
      throw err;
    }
  },
};

module.exports = User;
