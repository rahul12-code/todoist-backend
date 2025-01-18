
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/config/db.config");
db;

const seedDatabase = require('./seedDatabase');

const projectRoutes = require('./app/routes/project.routes')
projectRoutes(app);

const taskRoutes = require('./app/routes/task.routes');
taskRoutes(app);

const userRoutes = require('./app/routes/user.routes');
userRoutes(app);

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});