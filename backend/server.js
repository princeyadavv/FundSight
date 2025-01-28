require('dotenv').config()
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const path = require('path')
 
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json())


mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
