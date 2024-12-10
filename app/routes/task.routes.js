

const taskRoutes = (app) => {
    const tasks = require("../controllers/task.controller");
    const router = require("express").Router();
  
    router.post("/", tasks.create);
    router.get("/", tasks.findAll);
    router.get("/:id", tasks.findOne);
    router.put("/:id", tasks.update);
    router.delete("/:id", tasks.remove);
    router.delete("/", tasks.removeAll);
  
    app.use("/api/tasks", router);
  };
  
  module.exports = taskRoutes;
  