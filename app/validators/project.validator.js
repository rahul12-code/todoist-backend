
const yup = require("yup");

// Validation Schema for Project
const projectSchema = yup.object({
    
    name: yup
        .string().min(3).max(100).required("Name is required and must be between 3 and 100 characters"),

    color: yup
        .string(),
 
    is_favorite: yup
        .boolean().default(false),

    user_id: yup
        .number().integer().positive("User ID must be a positive number")
});

// Middleware for Project
const validateProject = async (req, res, next) => {
    try {
        req.body = await projectSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
        next();
    } catch (error) {
        res.status(400).send({ message: error.errors });
    }
};

module.exports = validateProject;
