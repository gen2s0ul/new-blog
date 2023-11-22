const bcrypt = require("bcrypt")
const User = require("../models/User")
const jwt = require("jsonwebtoken")

const tokenKey = "THis Is my seCreT tokEN  kEy stRIng"
const maxAge =  60 * 60 * 24
//function to genrate json web token
function generateWebToken(id){
     const token = jwt.sign({id}, tokenKey, {expiresIn: maxAge});
     return token;
}



module.exports.userRoute = (req, res)=>{
    
    Blog.find()
    .then(user =>{
         res.render('all-blogs', {"users" : user})
    })
    .catch(err => {
     console.log(err.message);
     res.send(err.message)
    })
}
//get signup page
module.exports.getSignUpPage = (req, res)=>{
    res.render('user/signup')
}

//post sign up page
module.exports.postSignUpPage =  async (req, res) => {
    let { firstname, lastname, email, password } = req.body;
    //generate salt 
    const salt = await bcrypt.genSalt()
    //hash the password using that salt
    password = await bcrypt.hash(password, salt)
    //create new user object 
    const user = new User({
        firstname,
        lastname,
        email,
        password,
    });
    //save user
    user.save()
    .then(data =>{
        res.json ({
            "message": "User resgistered succesfully",
        "user" : data
    });
    })
    .catch(err =>{
        console.log(err.message);
    });
}

//get login page
module.exports.getLoginPage = (req, res)=>{
    res.render('user/login')
}

//post login page
module.exports.postLoginPage = async (req, res)=>{
    let {email, password} = req.body;

    const user =  await User.findOne({email});
    if (user){
        //check password
        const auth = await  bcrypt.compare(password, user.password);
        if (auth){
            //generate user json web token
            const token = generateWebToken(user.id);
            //add token as cookie to response object
            res.cookie("jwt", token,{
                httpOnly : true,
                maxAge : maxAge * 1000
            })

            res.json({
                "message" : "User logged in succesfully",
                "user": {
                    "firstname": user.firstname,
                    "lastname": user.lastname,
                    "email": user.email
                }
            })
        } else {
            res.send("The password is incorrect")
        }
    }else {
        res.send(`User with email ${email} not found`)
    }
}

//user profile
module.exports.userProfile = (req, res)=>{
    res.render('user/user-profile')  
}
//my profile
module.exports.mYProfile = (req, res)=>{
    res.render('user/my-profile')  
}