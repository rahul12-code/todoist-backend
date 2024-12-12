

const yup = require("yup");

// Validation Schema for Users
const userSchema = yup.object({
    
    name: yup
        .string()
        .matches(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces")
        .min(3, "Name must be at least 3 characters long")
        .max(100, "Name cannot exceed 100 characters")
        .required("Name is required"),
        
    email: yup
        .string()
        .email("Email must be a valid email address")
        .required("Email is required"),
});

// Middleware for Validation
const validateUser = async (req, res, next) => {
    try {
        req.body = await userSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
        next();
    } catch (error) {
        res.status(400).json({ errors: error.errors });
    }
};

module.exports = validateUser;
