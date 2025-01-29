const users = require('../models/user');
const content = require('../models/content');
const mongoose = require('mongoose');

async function handleProfileGet(req, res) {
  try {
    const user = req.user; // Assuming user is already set in req.user

    // Check if user exists and has a valid ID
    if (!user || !user._id) {
      return res.status(400).json({ error: 'User not found or invalid ID' });
    }

    const objectId = new mongoose.Types.ObjectId(user._id);
    console.log(objectId);

    // Query content created by the user
    const hamaracontent = await content.find({
      createdBy: objectId,
    });

    // If no content is found
    if (!hamaracontent.length) {
      return res.status(404).json({ message: 'No content found for this user' });
    }

    // Send the response with the content
    return res.json(hamaracontent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error retrieving content', details: error.message });
  }
}

module.exports = { handleProfileGet };
