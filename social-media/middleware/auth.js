const jwt = require('jsonwebtoken');
const config = require('../config/keys');


module.exports = function(req,res,next){
    
    //get token from header
    const token = req.header('x-auth-token');
    console.log(req.user)

    //cheeck if not token
    if(!token){
        return res.status(401).json({msg : "no token . authorization denied"});
    }

    //verify token 

    try{
        const decoded = jwt.verify(token,config.secret);
        console.log(decoded)
        req.user = decoded.user;
        next();


    }catch(err){
        res.status(401).json({msg : "token is invalid"});
    }


}