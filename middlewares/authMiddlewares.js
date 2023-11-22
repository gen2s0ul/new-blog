const jwt = require('jsonwebtoken');
const User = require('../models/User');

const tokenKey = "THis Is my seCreT tokEN  kEy stRIng"
//middleware to check if user is logged in
const loggedIn = (req, res, next) =>{
const token = req.cookies.jwt;
if (token){
    jwt.verify(token, tokenKey, (err, decoded)=>{
if (err){
    console.log("invalid token");
    res.redirect("/users/login")
}else{
    req.user = decoded.id;//add user to req obj
    next();
}
    })
}else{
    res.redirect('/users/login');
}
}

//middlewarwe to check if user is logged in
const checkUser = (req, res, next) =>{
    const token = req.cookies.jwt;
if (token){
    jwt.verify(token, tokenKey, (err, decoded)=>{
if (err){
    res.locals.user = null;
    next();
}else{
     User.findById(decoded.id)//find user with decoded id
     .then(user =>{
        res.locals.user= user;//add user to req object
        next();
     })
}
    })
}else{
    res.locals.user = null;
    next();
}  
}
module.exports = {
    loggedIn,
    checkUser
};
