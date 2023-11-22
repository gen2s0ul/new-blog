const { Router } = require("express");
const Blog = require("../models/Blog")
const userControllers = require ('../controllers/userContollers')
const {loggedIn} = require("../middlewares/authMiddlewares")

//create router object 
const router = Router()

//routes
router.get("/users", userControllers.userRoute)

//user route
//get signup page
router.get("/users/signup",userControllers.getSignUpPage );

//post sign up page
 router.post("/users/signup", userControllers.postSignUpPage)

//to get login page
router.get("/users/login", userControllers.getLoginPage);

//post login page
router.post("/users/login",  userControllers.postLoginPage)

//My Profile
router.get("/users/my-profile",  loggedIn, userControllers.mYProfile);
router.get("/users/:id", userControllers.userProfile);

   //export router
module.exports = router