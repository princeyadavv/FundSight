require('dotenv').config()
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const path = require('path')
const csvtojson = require('csvtojson');
const fs = require('fs');

const {checkAuthentication}= require('./middlewares/auth')
const staticRouter = require('./routes/staticrouter');
const contentRouter = require('./routes/contentrouter')
// const csvFilePath = 'data.csv'; 
// const jsonFilePath = 'result.json';


// csvtojson()
//   .fromFile(csvFilePath)
//   .then((jsonObj) => {
//     // Convert the JSON object to a string and save it to a file
//      console.log(jsonObj)
//   })
//   .catch((error) => {
//     console.error('Error converting CSV to JSON:', error);
//   });
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json())
app.use('/',staticRouter)
app.use('/workflow',checkAuthentication,contentRouter)

// fs.readFile('result.json', 'utf8', (err, data) => {
//   if (err) {
//     console.error('Error reading the file:', err);
//     return;
//   }
//   const jsonData = JSON.parse(data);
//   const rounds = new Set()
//   jsonData.map((element)=>{
  
//     rounds.add(element.round)
//   })

//   console.log(rounds)
// });


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
