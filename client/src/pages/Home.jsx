import React,{useEffect,useContext, useState} from 'react'
import { GlobalContext } from '../context'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Home() {
  const {blogList, setBLogList,loading, setLoading} = useContext(GlobalContext)
  const navigate = useNavigate()
 async function handleDelete(currentId){
  const res=await axios.delete(`http://localhost:5000/api/blogs/delete/${currentId}`)
  const result=await res.data
  if(result?.message){
    fetchAllBlogs()
  }
 }
 async function handleUpdate(currentItem){
  navigate('/addBlog', {state:{currentItem}})
  
 }

  async function fetchAllBlogs() {
    
    try {
      const res = await axios.get('http://localhost:5000/api/blogs');
      const result =await res.data;
      
      if (result) {
       
        setBLogList(result)
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } 
  }
  
  useEffect(() => {
    fetchAllBlogs()
    console.log(blogList);
  }, [])
  
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl  mx-auto">
        <h1 className="text-3xl font-bold text-center underline mb-8">Your Blogs</h1>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid gap-8">
            {blogList.map((item) => (
              <div key={item._id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-gray-700">{item.description}</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleUpdate(item)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home
