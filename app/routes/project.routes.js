

const projectRoutes = (app) => { 

  const projects = require("../controllers/project.controller");

  const validateProject = require("../validators/project.validator");

  const authenticateJWT = require('../middleware/auth.middleware')

  const router = require("express").Router();

  router.post("/", validateProject, authenticateJWT, projects.create);

  router.get("/user-projects", authenticateJWT, projects.getProjectsByUserId);

  router.get("/",projects.findAll);

  router.get("/:id", projects.findOne);

  router.put("/:id", validateProject, projects.update);

  router.delete("/:id", projects.remove);

  router.delete("/", projects.removeAll);

  app.use("/api/projects", router);
};

module.exports = projectRoutes;
