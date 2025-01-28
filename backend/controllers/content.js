const content = require('../models/issue');
const mongoose = require('mongoose')
const users = require('../models/user');

async function handleUpload(req, res) {
    const {  description, type, long, lat,location } = req.body;
    const user = req.user
    const objectId = new mongoose.Types.ObjectId(user.id);
    try {
        const imgPath = req.file.path; 
      const issue =  await content.create({
                description,
                type,
                location,
                coordinates: `${lat},${long}`,
                img: imgPath, 
                createdBy: objectId, 
            });
            await users.findByIdAndUpdate(user._id,{
                $addToSet: { support: issue._id }
            })
            await users.updateMany({role:"ADMIN"},{
                $addToSet: { issueGiven: issue._id } 

                })
            return res.status(200).json({ message: "Issue created successfully!" });

    } catch (error) {
        console.error('Error in issue upload:', error);
        return res.status(500).json({ message: "Server Error" });
    }
}

async function createPost(req,res){
try{


    const {  title} = req.body;
    const user = req.user
    const objectId = new mongoose.Types.ObjectId(user.id);

    const newcontent =  await content.create({
        title,
        createdBy:objectId
    });
    return res.status(200).json({message:"workflow created successfully",id:newcontent.id})
}catch(error){
    return res.status(400).json({message:error})

}
    
    
}

module.exports = { handleUpload ,createPost};
