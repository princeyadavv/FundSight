const express = require('express');
const multer = require('multer');
const {createPost,converter} = require('../controllers/content');
const router = express.Router();
const upload = multer({ dest: "uploads/" });



router.post("/upload", upload.single("file"),converter)
router.post('/create', createPost);

module.exports = router;
