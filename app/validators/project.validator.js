
const yup = require("yup");

const projectSchema = yup.object().shape({
    
    name: yup
        .string().min(3).max(100).required("Name is required and must be between 3 and 100 characters"),

    color: yup
        .string()
        .required("Color is required"),

    is_favorite: yup
        .boolean().default(false),

    user_id: yup
        .number().integer().positive("User ID must be a positive number").required("User ID is required"),
});

const validateProject = async (req, res, next) => {
    try {
        req.body = await projectSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
        next();
    } catch (error) {
        res.status(400).send({ message: error.errors });
    }
};

module.exports = validateProject;
