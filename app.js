const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const blogRoutes = require('./routes/blogRoutes')
const userRoutes = require('./routes/userRoutes')
const { checkUser } = require('./middlewares/authMiddlewares')


//create express app
const app = express()

//set view engines
app.set('view engine', 'ejs')

// middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())


//connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/my-blog', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("connected to database");
    //start up server
app.listen(3000, () =>{
    console.log("server listening on port 3000")
})
}) .catch((err)=>{
    console.log(err)
})


// routes
app.get("*", checkUser)

//index route
app.get('/',  (req, res)=>{
    res.render('index')
})

//blog routes
app.use (blogRoutes)

//user route
app.use(userRoutes)

       
     


