const express = require('express');
const multer = require('multer');
const path = require('path');
const {createPost} = require('../controllers/content');
const router = express.Router();


// router.use('/comment',commentRouter)

// router.post('/support/:id',commentRouter)
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname)); 
//     }
// });
// const upload = multer({ storage: storage });

// router.post('/create', createPost);
// router.get('/',(req,res)=>{
//     res.send('issue')
// })

module.exports = router;
