

const commentRoutes = (app) => {
    
    const comments = require("../controllers/comment.controller");
    const router = require("express").Router();

    router.post("/", comments.create);

    router.get("/", comments.findAll);

    router.get("/:id", comments.findOne);

    router.put("/:id", comments.update);

    router.delete("/:id", comments.remove);

    router.delete("/", comments.removeAll);
  
    app.use("/api/comments", router);
};
  
module.exports = commentRoutes;
