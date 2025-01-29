const express = require('express')
const router = express.Router()
const {handleProfileGet} = require("../controllers/profile")
router.get('/',handleProfileGet)
module.exports = router