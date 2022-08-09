const jwt = require("jsonwebtoken");
const createError = require("../error/error.js")

class middleware{
    static verifyToken = async (req, res, next) =>{
        const token = req.cookies.access_token;
        console.log("req.cookies.access_token", req.cookies.access_token)
        if(!token) return next(createError(401, "You are not authenticated"))
    
        jwt.verify(token, process.env.JWT, (err, user)=>{
            if(err) return next(createError(403, "Token is not valid!"))
            req.user = user
            next()
        });
    }  
}
 

module.exports = middleware