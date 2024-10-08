const jwt = require('jsonwebtoken');

module.exports = function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    // console.log("Authorization Header:", authHeader);

    if (!authHeader) {
        return res.status(403).json({
            message: 'No token provided'
        });
    }

    const token = authHeader.split(' ')[1];
    // console.log("Extracted Token:", token);

    if (!token) {
        return res.status(403).json({
            message: 'Invalid token format'
        });
    }

    jwt.verify(token, process.env.SECRET_STR, (err, decode) => {
        if (err) {
            console.error("JWT Error:", err);
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.username = decode.username;
        next();
    });
};
