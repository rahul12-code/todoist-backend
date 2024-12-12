
const Comment = require("../models/comment.model");

const create = async (req, res) => {
    try {
        const comment = { 
            content: req.body.content,
            project_id:req.body.project_id,
            task_id: req.body.task_id
        };
        const result = await Comment.create(comment);
        res.send({ id: result.id, ...comment });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const findAll = async (req, res) => {
    try {
        const rows = await Comment.findAll();
        res.send(rows);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const row = await Comment.findById(id);
        if (!row) res.status(404).send({ message: `Comment with id ${id} not found` });
        else res.send(row);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const { content } = req.body;
        const changes = await Comment.update(id, { content });
        if (changes === 0) res.status(400).send({ message: `Comment with id ${id} not found` });
        else res.send({ message: `Comment with id ${id} updated successfully` });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const changes = await Comment.delete(id);
        if (changes === 0) res.status(400).send({ message: `Comment with id ${id} not found` });
        else res.send({ message: `Comment with id ${id} deleted successfully` });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const removeAll = async (req, res) => {
    try {
        await Comment.deleteAll();
        res.send({ message: "All comments deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

module.exports = { create, findAll, findOne, update, remove, removeAll };
