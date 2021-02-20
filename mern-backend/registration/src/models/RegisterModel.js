const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

  tokens: [{
    token: {
      type: String,
      required: true,
    }
  }]

});


// GENERATING THE JWT WEB TOKEN
registerSchema.methods.generateAuthToken = async function(){

  try{
    console.log(this._id)
    const token = jwt.sign({_id:this.id.toString()},"this_is_a_super_secret_or_private_key")
    this.tokens = this.tokens.concat({token:token})
    await this.save();
    return token
  }
  catch(err)
  {
    res.send(err)
  }
}


// HASHING THE PASSWORD
registerSchema.pre("save", async function(next){

  if(this.isModified("password")){
    // console.log(`the current password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    // console.log(`hashed password is ${this.password}`);

    this.confirmPassword = await bcrypt.hash(this.password, 10);
  }
  next();
})


// creating a new collection
const userRegister = new mongoose.model("userRegister", registerSchema);

// EXPORTING THE COLLECTION
module.exports = userRegister;