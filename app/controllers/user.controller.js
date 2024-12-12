

const User = require("../models/user.model");

const create = async (req, res) => {
    try {
        const user = {
            name: req.body.name,
            email: req.body.email,
        };
        const result = await User.create(user);
        res.send({ id: result.id, ...user });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const findAll = async (req, res) => {
    try {
        const rows = await User.findAll();
        res.send(rows);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const row = await User.findById(id);
        if (!row) res.status(404).send({ message: `User with id ${id} not found` });
        else res.send(row);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const user = {
            name: req.body.name,
            email: req.body.email,
        };
        const changes = await User.update(id, user);
        if (changes === 0) {
            return res.status(400).send({ message: `User with id ${id} not found` });
        }
        res.send({ message: `User with id ${id} updated successfully` });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const changes = await User.delete(id);
        if (changes === 0) {
            return res.status(400).send({ message: `User with id ${id} not found` });
        }
        res.send({ message: `User with id ${id} deleted successfully` });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const removeAll = async (req, res) => {
    try {
        await User.deleteAll();
        res.send({ message: "All users deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

module.exports = { create, findAll, findOne, update, remove, removeAll };
