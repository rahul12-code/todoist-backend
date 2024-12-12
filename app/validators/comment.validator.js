
const yup = require("yup");

// Validation Schema for Comments
const commentSchema = yup.object({
    
    content: yup
        .string()
        .min(3, "Content must be at least 3 characters long")
        .max(500, "Content cannot exceed 500 characters")
        .required("Content is required"),

    project_id: yup
        .number()
        .integer()
        .positive("Project ID must be a positive number"),

    task_id: yup
        .number()
        .integer()
        .positive("Task ID must be a positive number")
})

// Middleware for Validation
const validateComment = async (req, res, next) => {
    try {
        req.body = await commentSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
        next();
    } catch (error) {
        res.status(400).json({ errors: error.errors });
    }
};

module.exports = validateComment;
