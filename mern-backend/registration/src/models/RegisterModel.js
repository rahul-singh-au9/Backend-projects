const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({

  Fname: {
    type: String,
    required: true,
  },

  Lname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
    trim: true
  },

  confirmPassword: {
    type: Number,
    required: true,
    trim: true
  },

});

// creating a new collection
const userRegister = new mongoose.model("userRegister", registerSchema);

module.exports = userRegister;