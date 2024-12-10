

const Project = require("../models/project.model");

const create = (req, res) => {
    if (!req.body.name) {
      return res.status(400).send({ message: "Name cannot be empty!" });
    }
    const project = { name: req.body.name, color: req.body.color, is_favorite: req.body.is_favorite || 0 };
    Project.create(project, (err, result) => {
      if (err) res.status(500).send({ message: err.message });
      else res.send({ id: result.id, ...project });
    });
};
  
const findAll = (req, res) => {
    Project.findAll((err, rows) => {
      if (err) res.status(500).send({ message: err.message });
      else res.send(rows);
    });
};

const findOne = (req, res) => {
    const id = req.params.id;
    Project.findById(id, (err, row) => {
      if (err) res.status(500).send({ message: err.message });
      else if (!row) res.status(404).send({ message: `Project with id ${id} not found` });
      else res.send(row);
    });
};
  
const update = (req,res) => {
    const id = req.params.id;
    const project = { name: req.body.name, color: req.body.color, is_favorite: req.body.is_favorite};
    Project.update(id, project, (err) => {
        if (err) res.status(500).send({ message: err.message });
        else res.send({ message: `Project with id ${id} updated successfully` });
    });
}

const remove = (req, res) => {
    const id = req.params.id;
    Project.delete(id, (err) => {
      if (err) res.status(500).send({ message: err.message });
      else res.send({ message: `Project with id ${id} deleted successfully` });
    });
  };
  
const removeAll = (req, res) => {

    Project.deleteAll((err) => {
        if (err) res.status(500).send({ message: err.message });
        else res.send({ message: "All projects deleted successfully" });
    });
};


module.exports = {create,findAll,findOne,update,remove,removeAll};