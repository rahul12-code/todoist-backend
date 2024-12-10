

const Task = require("../models/task.model");

const create = (req, res) => {
  if (!req.body.content) {
    return res.status(400).send({ message: "Content cannot be empty!" });
  }

  const task = {
    content: req.body.content,
    description: req.body.description,
    due_date: req.body.due_date,
    is_completed: req.body.is_completed || 0,
    project_id: req.body.project_id,
  };

  Task.create(task, (err, result) => {
    if (err) res.status(500).send({ message: err.message });
    else res.send({ id: result.id, ...task });
  });
};

const findAll = (req, res) => {
  Task.findAll((err, rows) => {
    if (err) res.status(500).send({ message: err.message });
    else res.send(rows);
  });
};

const findOne = (req, res) => {
  const id = req.params.id;
  Task.findById(id, (err, row) => {
    if (err) res.status(500).send({ message: err.message });
    else if (!row) res.status(404).send({ message: `Task with id ${id} not found` });
    else res.send(row);
  });
};

const update = (req, res) => {
  const id = req.params.id;
  const task = {
    content: req.body.content,
    description: req.body.description,
    due_date: req.body.due_date,
    is_completed: req.body.is_completed,
  };

  Task.update(id, task, (err) => {
    if (err) res.status(500).send({ message: err.message });
    else res.send({ message: `Task with id ${id} updated successfully` });
  });
};

const remove = (req, res) => {
  const id = req.params.id;
  Task.delete(id, (err) => {
    if (err) res.status(500).send({ message: err.message });
    else res.send({ message: `Task with id ${id} deleted successfully` });
  });
};

const removeAll = (req, res) => {
  Task.deleteAll((err) => {
    if (err) res.status(500).send({ message: err.message });
    else res.send({ message: "All tasks deleted successfully" });
  });
};

module.exports = { create, findAll, findOne, update, remove, removeAll };
