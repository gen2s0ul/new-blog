const { Router } = require("express");
const blogControllers = require ('../controllers/blogControllers')
const {loggedIn} = require('../middlewares/authMiddlewares')

//create  router object
const router = Router();

//routes
router.get("/blogs", blogControllers.allBlogs)

//create new blog
router.get('/blogs/new', loggedIn,  blogControllers.newBlogPage)
//post request
router.post('/blogs/new', loggedIn, blogControllers.addNewBlog)

//get single blog
router.get('/blogs/:id',blogControllers.singleBlog)
//delete a single blog
router.delete("/blogs/:id", (req, res)=>{

})

//export router
module.exports = router