
const userRoutes = (app) => {

    const users = require("../controllers/user.controller");

    const validateUser = require("../validators/user.validator");

    const router = require("express").Router();
  
    router.post("/", validateUser, users.create);

    router.get("/", users.findAll);

    router.get("/:id", users.findOne);

    router.put("/:id", validateUser, users.update);

    router.delete("/:id", users.remove);

    router.delete("/", users.removeAll);
  
    app.use("/api/users", router);
  };
  
  module.exports = userRoutes;
  