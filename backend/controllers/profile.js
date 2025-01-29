const users = require('../models/user')
const content = require('../models/content')

async function handleProfileGet(req,res){
    const user = req.user
    const hamaracontent = await content.find({
        
    })
return res.json(hamaracontent)
}
module.exports = {handleProfileGet}