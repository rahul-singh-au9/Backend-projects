require('dotenv').config()
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")
require ("./db/connection");
const userRegister = require("./models/RegisterModel");
const auth = require("../middleware/auth");
const app = express();
const PORT = process.env.PORT || 3001;


// FOR PARSING THE JSON , WE DONT HAVE TO USE UN-NECESSARY BODY-PARSER PACKAGE BCS THE METHOD IS AVAILABLE INSIDE THE EXPRESS

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

// FOR SERVING STATIC HTML FILES
// app.use(express.static())

app.set("view engine", "hbs");

const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("views", viewsPath);
hbs.registerPartials(partialsPath);


// HOME-PAGE
app.get("/", (req, res)=>{
    res.render("index")
})

// ABOUT-PAGE - SECURED WITH JWT AUTH
app.get("/about", auth, (req, res)=>{
    // console.log(`JWT cookie value ${req.cookies.JWT}`)
    res.render("about")
})

// USER REGISTRATION FORM
app.get("/register", (req, res) => {
    res.render("register")
})

//USER REGISTRATION POST DATA
app.post("/register", async(req, res) => {

  try{
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if(password === confirmPassword){
      const registeredUser = new userRegister({
        Fname: req.body.Fname,
        Lname: req.body.Lname,
        email: req.body.email,
        password,
        confirmPassword
      })

      // JWT TOKEN
      const token = await registeredUser.generateAuthToken()
      // console.log("registration token", token)


      // STORING COOKIE
      // The res.cookie() function is used to set the cookie name to value.
      // The value parameter may be a string or object converted to JSON.
      // SYNTAX:
      // res.cookie(name, value, [options])

      res.cookie("JWT", token, {
        expires: new Date(Date.now() + 60000),
        httpOnly: true
      })
      // console.log(cookie);

      // SAVING DATA TO DB
      const registered = await registeredUser.save();
      // console.log(registered)

      res.status(201).render("index");

    }else{
      res.send("<h1> please fill correct password </h1>");
    }

  }catch(err){
    res.send(err);
  }

})

// USER LOG-IN FORM
app.get("/login", (req, res) => {
  res.render("login");
})

// CHECK LOGIN
app.post("/login", async(req, res) => {
  try{

    const email = req.body.email;
    const password = req.body.password;

    const user = await userRegister.findOne({email});

    const isMatch = await bcrypt.compare(password, user.password);

    const token = await user.generateAuthToken()
    // console.log("login token", token)

    res.cookie("JWT", token, {
        expires: new Date(Date.now() + 60000),
        httpOnly: true,
        // secure: true
      })

    if(isMatch){
      res.status(201).render("index");
    }else{
      res.send(" <h1><center> email or password is wrong! </center></h1>");
    }

  }catch(err){
    res.send(err);
  }
})


// LOG-OUT FROM CURRENT DEVICE
app.get("/logout", auth, async(req, res)=>{

  try{

    req.user.tokens = req.user.tokens.filter((currToken) => {
      return currToken.token !== req.token
    })

    res.clearCookie("JWT")

    await req.user.save();

    res.render("logout")

  }catch(err){
    res.send(err)
  }
})

// LOG-OUT FROM ALL DEVICES
app.get("/logoutAll", auth, async(req, res)=>{

  try{

    req.user.tokens = [];

    res.clearCookie("JWT")

    await req.user.save();

    res.render("logout")

  }catch(err){
    res.send(err)
  }
})


// ROUTES THAT NOT BEEN DEFINED
app.get("*", (req, res) => {
  res.send(" <h1> <center> You've tried reaching a route that doesn't exist. </center> </h1>")
})

// CONNECTING TO THE SERVER
app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
}
)