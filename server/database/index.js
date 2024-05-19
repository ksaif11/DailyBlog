const mongoose = require('mongoose')
require('dotenv').config();

mongoose.set('strictQuery', false)

const uri = process.env.MONGODB_URI;

mongoose
 .connect(uri)
 .then(() => console.log('MongoDB connected'))
 .catch((error) => console.log('Error connecting to MongoDB:', error));
