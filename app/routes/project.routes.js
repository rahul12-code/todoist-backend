

const projectRoutes = (app) => {

  const projects = require("../controllers/project.controller");

  const validateProject = require("../validators/project.validator");

  const router = require("express").Router();

  router.post("/", validateProject, projects.create);

  router.get("/",projects.findAll);

  router.get("/:id", projects.findOne);

  router.put("/:id", validateProject, projects.update);

  router.delete("/:id", projects.remove);

  router.delete("/", projects.removeAll);

  app.use("/api/project", router);
};

module.exports = projectRoutes;
