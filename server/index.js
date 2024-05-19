const express =require('express')
const cors=require('cors');
const blogRouter = require('./route/Blog-Routes');
require ('./database/index')


const app=express()
const port=5000;

app.use(cors())

app.use(express.json())

app.use('/api/blogs', blogRouter)

app.use("/api",(req,res)=>{
    res.send("hello")
})

app.listen(port,()=>console.log(`server is running on port ${port}`))

