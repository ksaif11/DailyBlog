const express = require("express");

const blogRouter = express.Router();

const {
  fetchListOfBlogs,
  addNewBlog,
  updateTheBlog,
  deleteTheBlog,
} = require("../controller/Blog-controller");

blogRouter.get('/',fetchListOfBlogs)
blogRouter.post('/add',addNewBlog)
blogRouter.put('/update/:id',updateTheBlog)
blogRouter.delete('/delete/:id',deleteTheBlog)

module.exports= blogRouter;