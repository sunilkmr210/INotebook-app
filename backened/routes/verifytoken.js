const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next)=>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.jwt_key, (err, user)=>{
            if(err) res.status(403).json("Token is not valid");
            req.user = user;
            next();
        })
    }
    else{
        return res.status(404).json("You are not authenticated");
    }
}

const verifyAndAuth = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(1||req.user.id === req.params.id){
            next();
        }
        else{
            res.status(403).json("You are not allowed to do that")
        }
    });
};

module.exports = {verifyToken, verifyAndAuth};

