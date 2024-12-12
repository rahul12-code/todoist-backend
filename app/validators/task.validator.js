
const yup = require("yup");

// Validation Schema for Tasks
const taskSchema = yup.object({

    content: yup
        .string().min(3).max(255).required("Content is required and must be between 3 and 255 characters"),

    description: yup
        .string()
        .max(500, "Description cannot exceed 500 characters"),
        
    due_date: yup
        .date()
        .transform((value) => (value === "" ? null : value))
        .typeError("Due date must be a valid date"),

    is_completed: yup
        .boolean().default(false),

    project_id: yup
        .number()
        .integer()
        .positive("Project ID must be a positive number")
});

// Middleware for Validation
const validateTask = async (req, res, next) => {
    try {
        req.body = await taskSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
        next();
    } catch (error) {
        res.status(400).json({ errors: error.errors });
    }
};

module.exports = validateTask;
