const pool = require("../config/db.config");

const Project = {
    create: async (project) => {
        try {
            const sql = `INSERT INTO projects (name, color, is_favorite, user_id) VALUES ($1, $2, $3, $4) RETURNING id`;
            const result = await pool.query(sql, [project.name, project.color, project.is_favorite, project.user_id]);
            return { id: result.rows[0].id };
        } catch (err) {
            throw err;
        }
    },

    findByUserId: async (userId) => {
        try {
            const sql = `SELECT * FROM projects WHERE user_id = $1`;
            const result = await pool.query(sql, [userId]);
            return result.rows;
        } catch (err) {
            throw err;
        }
    },

    findAll: async () => {
        try {
            const sql = `SELECT * FROM projects`;
            const result = await pool.query(sql);
            return result.rows;
        } catch (err) {
            throw err;
        }
    },

    findById: async (id) => {
        try {
            const sql = `SELECT * FROM projects WHERE id = $1`;
            const result = await pool.query(sql, [id]);
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    },

    update: async (id, project) => {
        try {
            const sql = `UPDATE projects SET name = $1, color = $2, is_favorite = $3 WHERE id = $4 RETURNING *`;
            const result = await pool.query(sql, [project.name, project.color, project.is_favorite, id]);
            return result.rowCount;
        } catch (err) {
            throw err;
        }
    },

    delete: async (id) => {
        try {
            const sql = `DELETE FROM projects WHERE id = $1 RETURNING *`;
            const result = await pool.query(sql, [id]);
            return result.rowCount;
        } catch (err) {
            throw err;
        }
    },

    deleteAll: async () => {
        try {
            const sql = `DELETE FROM projects`;
            await pool.query(sql);
        } catch (err) {
            throw err;
        }
    },
};

module.exports = Project;
