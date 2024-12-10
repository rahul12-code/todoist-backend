
const db = require("../config/db.config");

const Project = {

    create: (project, callback) => {
      const sql = `INSERT INTO project (name,color,is_favorite) VALUES (?, ?, ?)`;
      db.run(sql, [project.name, project.color, project.is_favorite], function (err) {
        callback(err, { id: this.lastID });
      });
    },
  
    findAll: (callback) => {
      const sql = `SELECT * FROM project`;
      db.all(sql, [], callback);
    },

    findById: (id, callback) => {
        const sql = `SELECT * FROM project WHERE id = ?`;
        db.get(sql, [id], callback);
    },

    update: (id, project, callback) => {
        const sql = `UPDATE project SET name = ?, color = ?, is_favorite = ? WHERE id = ?`;
        db.run(sql, [project.name, project.color, project.is_favorite, id], callback);
    },

    delete: (id, callback) => {
        const sql = `DELETE FROM project WHERE id = ?`;
        db.run(sql, [id], callback);
    },
    
    deleteAll: (callback) => {
        const sql = `DELETE FROM project`;
        db.run(sql, [], callback);
    }

}  

module.exports = Project