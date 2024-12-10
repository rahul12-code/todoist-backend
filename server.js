
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const projectRoutes = require('./app/routes/project.routes')
projectRoutes(app);

const taskRoutes = require('./app/routes/task.routes');
taskRoutes(app);

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});