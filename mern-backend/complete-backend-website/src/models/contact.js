const mongoose = require("mongoose");
const validator = require("validator");
// CONTACT SCHEMA FOR VALIDATION

const contactSchema = mongoose.Schema({

  name: {
    type: String,
    minlength: 3,
    required: true,
    trim: true
  },

  subject: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Please enter a valid Email !")
      }
    }
  },

  message: {
    type: String,
    required: true,
    trim: true
  },

  date: {
    type: Date,
    default: Date.now
  }

});

// MODEL
// we will create a new collection
const Contact = new mongoose.model("Contact", contactSchema);

// export Contact to other files
module.exports =  Contact;