


const userRoutes = (app) => {
    const users = require("../controllers/user.controller");
    const router = require("express").Router();
  
    router.post("/", users.create);
    router.get("/", users.findAll);
    router.get("/:id", users.findOne);
    router.put("/:id", users.update);
    router.delete("/:id", users.remove);
    router.delete("/", users.removeAll);
  
    app.use("/api/users", router);
  };
  
  module.exports = userRoutes;
  