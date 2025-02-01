
const Project = require("../models/project.model");

const create = async (req, res) => {
    try {
        const project = {
            name: req.body.name,
            color: req.body.color,
            is_favorite: req.body.is_favorite || false,
            user_id: req.user.id // Assuming user ID is extracted by `authenticateJWT`
        };
        const result = await Project.create(project);
        console.log(`Project created with ID: ${result.id}`);
        res.status(200).send({ id: result.id, ...project });
    } catch (err) {
        console.error(`Error creating project: ${err.message}`);
        res.status(500).send({ message: err.message });
    }
};

const getProjectsByUserId = async (req, res) => {
    try {
      const userId = req.user.id; // Assuming user ID is extracted by `authenticateJWT`
      const projects = await Project.findByUserId(userId); // Method to fetch projects for the user
      res.send(projects);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
};

const findAll = async (req, res) => {
    try {
        console.log('Fetching all projects');
        const rows = await Project.findAll();
        console.log(`Fetched ${rows.length} projects`);
        res.status(200).send(rows);
    } catch (err) {
        console.error(`Error fetching projects: ${err.message}`);
        res.status(500).send({ message: err.message });
    }
};

const findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const row = await Project.findById(id);
        if (!row) res.status(404).send({ message: `Project with id ${id} not found` });
        else res.status(200).send(row);
    } catch (err) {
        console.error("Error findind Id: %s", err.message);
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
          console.log(`Project with id ${id} not found for partial update`);
          return res.status(400).send({ message: `Project with id ${id} not found` });
        }
        res.status(200).send({ message: `Project with id ${id} updated successfully` });
    } catch (err) {
        console.error(`Error updating project partially: ${err.message}`);
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
        res.status(200).send({ message: `Project with id ${id} deleted successfully` });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const removeAll = async (req, res) => {
    try {
        await Project.deleteAll();
        res.status(200).send({ message: "All projects deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

module.exports = { create, getProjectsByUserId, findAll, findOne, update, remove, removeAll };
