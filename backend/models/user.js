const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    Workflows: [
      {
        type: Schema.Types.ObjectId,
        ref: 'content',
      },
    ],
  },
  { timestamps: true }
);

const User = model('user', userSchema);


module.exports = User;
