import jwt from "jsonwebtoken";

function authenticateToken(req, res, next) {


    const authHeader = req.headers['authorization'];
    console.log("authHeader >>", authHeader)

  
    const token = authHeader && authHeader.split(' ')[1];
    console.log("token >>", token)

    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token missing.' });
    }

  
    jwt.verify(token, process.env.JWT, (err, decodedPayload) => {
        if (err) {
            console.log("errr >>", err)
            
            return res.status(403).json({ message: 'Invalid or expired token.' });
        }

        console.log("decodedPayload >>", decodedPayload)

       
        req.user = decodedPayload;

        
        next();
    });
}

export {
    authenticateToken
}
