
const Project = require("../models/project.model");

const create = async (req, res) => {
    try {
        const project = {
            name: req.body.name,
            color: req.body.color,
            is_favorite: req.body.is_favorite || false,
            user_id:req.body.user_id
        };
        const result = await Project.create(project);
        res.send({ id: result.id, ...project });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const findAll = async (req, res) => {
    try {
        const rows = await Project.findAll();
        res.send(rows);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const row = await Project.findById(id);
        if (!row) res.status(404).send({ message: `Project with id ${id} not found` });
        else res.send(row);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const project = {
            name: req.body.name,
            color: req.body.color,
            is_favorite: req.body.is_favorite,
        };
        const changes = await Project.update(id, project);
        if(changes===0){
          return res.status(400).send({ message: `Project with id ${id} not found` });
        }
        res.send({ message: `Project with id ${id} updated successfully` });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const changes = await Project.delete(id);
        if(changes===0){
          return res.status(400).send({ message: `Project with id ${id} not found` });
        }
        res.send({ message: `Project with id ${id} deleted successfully` });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const removeAll = async (req, res) => {
    try {
        await Project.deleteAll();
        res.send({ message: "All projects deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

module.exports = { create, findAll, findOne, update, remove, removeAll };
