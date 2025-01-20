const jwt = require('jsonwebtoken');
const SECRET_KEY = 'd1f2a4b5c6d7e8f9g0h1j2k3m4n5p6q7';  // Example secure secret key

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403).json({message:'Invalid Token'});
            }
            req.user = user; // Store user data (id, email, etc.) for further use
            next();
        });
    } else {
        res.sendStatus(401).json({message:'Token Not Found!'});
    }
};

module.exports = authenticateJWT;
