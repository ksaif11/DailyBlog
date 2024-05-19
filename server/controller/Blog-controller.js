const mongoose = require('mongoose')
const Blog=require('../model/Blog')


const fetchListOfBlogs = async(req,res)=>{
    
    try {
        let bloglist=await Blog.find();
        if(!bloglist){
            return res.status(404).json({message:'No Blog found!'})
        }
        return res.status(200).json(bloglist)
    } catch (error) {
        console.log(error);
    }
}

const addNewBlog=async(req,res)=>{
    const {title, description} = req.body;
    const currentDate= new Date();
    const newlyCreatedBlog=new Blog({
        title, description,date:currentDate
    })
    await newlyCreatedBlog.save()

    try {
        const session=await mongoose.startSession()
        session.startTransaction()
        await newlyCreatedBlog.save(session)
        session.commitTransaction()
    } catch (error) {
        return res.status(500).json({message:error})
    }

    return res.status(200).json({newlyCreatedBlog})
}

const deleteTheBlog = async(req,res)=>{
    const id=req.params.id;
    try {
        const blog = await Blog.findByIdAndDelete(id)
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found!' });
          }
        return res.status(200).json({message:'successfully deleted blog!'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Unable to delete, Please try again!'})
    }
}

const updateTheBlog = async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;
  
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { title, description },
        { new: true }
      );
  
      if (!updatedBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      return res.status(200).json(updatedBlog);
    } catch (error) {
      console.error('Error updating blog:', error);
      return res.status(500).json({ message: 'Something went wrong, please try again later!' });
    }
  };
  

module.exports = {fetchListOfBlogs, addNewBlog, deleteTheBlog, updateTheBlog}