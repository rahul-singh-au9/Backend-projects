const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

registerSchema.pre("save", async function(next){

  if(this.isModified("password")){
    console.log(`the current password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`hashed password is ${this.password}`);

    this.confirmPassword = undefined;
  }
  next();
})

// creating a new collection
const userRegister = new mongoose.model("userRegister", registerSchema);

module.exports = userRegister;