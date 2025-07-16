const JWT = require("jsonwebtoken");
const secretKey = 'arpit';

const ensureAuthenticated = (req,res,next) => {
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(403)
        .json({message:"Unauthorized,JWT token is required"})
    }
    try{
        const decodedData = JWT.verify(auth,secretKey);
        req.user = decodedData; // without using database call,
                                // email,password direct access kari sakay
        next();
    }catch(error){
        return res.status(403)
        .json({message:"Unauthorized, JWT token wrong or expired"})
    }
}

module.exports = ensureAuthenticated;