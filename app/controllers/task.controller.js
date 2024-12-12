
const Task = require("../models/task.model");

const create = async (req, res) => {
    try {
        const task = {
            content: req.body.content,
            description: req.body.description,
            due_date: req.body.due_date,
            is_completed: req.body.is_completed || false,
            project_id: req.body.project_id,
        };
        const result = await Task.create(task);
        res.send({ id: result.id, ...task });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const findAll = async (req, res) => {
    try {
        let filters = {
            project_id: req.query.project_id,
            due_date: req.query.due_date,
            is_completed: req.query.is_completed ? parseInt(req.query.is_completed) : undefined,
            created_at: req.query.created_at,
        };

        const rows = await Task.findAll(filters);
        const formattedTasks = rows.map(row => ({
            ...row,
            due_date: new Date(row.due_date).toISOString().split('T')[0], // Format to YYYY-MM-DD
        }));
        res.send(formattedTasks);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const row = await Task.findById(id);
        if (!row) res.status(404).send({ message: `Task with id ${id} not found` });
        else res.send(row);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const task = {
            content: req.body.content,
            description: req.body.description,
            due_date: req.body.due_date,
            is_completed: req.body.is_completed,
        };
        const changes = await Task.update(id, task);
        if(changes===0){
          return res.status(400).send({ message: `Task with id ${id} not found` });
        }
        res.send({ message: `Task with id ${id} updated successfully` });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const changes = await Task.delete(id);
        if(changes===0){
          return res.status(400).send({ message: `Task with id ${id} not found` });
        }
        res.send({ message: `Task with id ${id} deleted successfully` });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const removeAll = async (req, res) => {
    try {
        await Task.deleteAll();
        res.send({ message: "All tasks deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

module.exports = { create, findAll, findOne, update, remove, removeAll };
