require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "http://localhost:5173", // Allow local development
  process.env.FRONTEND_URL, // Render Deployed Frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import database connection
const db = require("./app/config/db.config");

// Import and use routes
const projectRoutes = require("./app/routes/project.routes");
const taskRoutes = require("./app/routes/task.routes");
const userRoutes = require("./app/routes/user.routes");

projectRoutes(app);
taskRoutes(app);
userRoutes(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
