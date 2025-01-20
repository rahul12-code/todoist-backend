
const userRoutes = (app) => {

    const users = require("../controllers/user.controller");

    const validateUser = require("../validators/user.validator");

    const authenticateJWT = require('../middleware/auth.middleware')

    const router = require("express").Router();
  
    // router.post("/", validateUser, users.create);

    router.post("/", users.create);

    router.post("/login", users.login);

    router.get("/", authenticateJWT, users.findAll);

    router.get("/:id", authenticateJWT, users.findOne);

    router.put("/:id", validateUser, authenticateJWT, users.update);

    router.delete("/:id", authenticateJWT, users.remove);

    router.delete("/", authenticateJWT, users.removeAll);
  
    app.use("/api/users", router);
  };
  
  module.exports = userRoutes;
  