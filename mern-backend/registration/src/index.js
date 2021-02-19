const express = require("express");
const path = require("path");
const hbs = require("hbs");
require ("./db/connection");
const userRegister = require("./models/RegisterModel");

// import userRouter from "./routes/userRouters.js";
const app = express();
const PORT = process.env.PORT || 3001;

// FOR PARSING THE JSON , WE DONT HAVE TO USE UN-NECESSARY BODY-PARSER PACKAGE BCS THE METHOD IS AVAILABLE INSIDE THE EXPRESS

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// app.use(express.static())

app.set("view engine", "hbs");

const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.set("views", viewsPath);
hbs.registerPartials(partialsPath)

// HOMEPAGE
app.get("/", (req, res)=>{
  res.render("index")
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

      const registered = await registeredUser.save();
      res.status(201).render("index")

    }else{
      res.send("<h1> please fill correct password </h1>")
    }

  }catch(err){
    res.send(err)
  }

})

// USER LOG-IN FORM
app.get("/login", (req, res) => {
  res.render("login")
})

// CHECK LOGIN
app.post("/login", async(req, res) => {
  try{

    const email = req.body.email;
    const password = req.body.password;

    const user = await userRegister.findOne({email});

    if(user.password === password){
      res.status(201).render("index")
    }else{
      res.send(" <h1><center> email or password is wrong! </center></h1>")
    }

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
  console.log(`Server running on port: http://localhost:${PORT}`)
}
)