
const yup = require("yup");

// Validation Schema for Users
const userSchema = yup.object({
    first_name: yup
        .string()
        .matches(/^[a-zA-Z\s]+$/, "First name must contain only letters and spaces")
        .min(2, "First name must be at least 2 characters long")
        .max(50, "First name cannot exceed 50 characters")
        .required("First name is required"),
        
    last_name: yup
        .string()
        .matches(/^[a-zA-Z\s]+$/, "Last name must contain only letters and spaces")
        .min(2, "Last name must be at least 2 characters long")
        .max(50, "Last name cannot exceed 50 characters")
        .required("Last name is required"),
        
    email: yup
        .string()
        .email("Email must be a valid email address")
        .required("Email is required"),
        
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(100, "Password cannot exceed 100 characters")
        .required("Password is required")
});

// Middleware for Validation
const validateUser = async (req, res, next) => {
    try {
        req.body = await userSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
        next();
    } catch (error) {
        res.status(400).json({ errors: error.errors });
        console.log(error);
    }
};

module.exports = validateUser;
