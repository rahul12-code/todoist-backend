

const projectRoutes = (app) => {

  const projects = require("../controllers/project.controller");

  const router = require("express").Router();

  router.post("/", projects.create);

  router.get("/",projects.findAll);

  router.get("/:id", projects.findOne);

  router.put("/:id", projects.update);

  router.delete("/:id", projects.remove);

  router.delete("/", projects.removeAll);

  app.use("/api/project", router);
};

module.exports = projectRoutes;
