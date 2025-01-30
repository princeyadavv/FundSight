const users = require('../models/user');
const content = require('../models/content');
const mongoose = require('mongoose');

async function handleProfileGet(req, res) {
  try {
    const user = req.user; 

    
    if (!user || !user._id) {
      return res.status(400).json({ error: 'User not found or invalid ID' });
    }

    const objectId = new mongoose.Types.ObjectId(user._id);

    
    const hamaracontent = await content.find({
      createdBy: objectId,
    });

    
    if (!hamaracontent.length) {
      return res.status(404).json({ message: 'No content found for this user' });
    }

    
    return res.json(hamaracontent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error retrieving content', details: error.message });
  }
}

module.exports = { handleProfileGet };
