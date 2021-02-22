const express = require("express");
const path = require("path");
const hbs = require("hbs");
require("./db/connection");
const contactRouter = require("./routes/contactRouter");
const app = express();
const PORT = process.env.PORT || 3001;

// FOR PARSING THE JSON , WE DONT HAVE TO USE UN-NECESSARY BODY-PARSER PACKAGE BCS THE METHOD IS AVAILABLE INSIDE THE EXPRESS
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set("view engine", "hbs")

const viewsPath = path.join(__dirname, "../views");
app.set("views", viewsPath);

// HOMEPAGE
app.get("/", (req, res) => {
  res.render("index")
})

// CONTACT ROUTES
app.use("/contact", contactRouter);

// ROUTES THAT NOT BEEN DEFINED
app.get("*", (req, res) => {
  res.send("You've tried reaching a route that doesn't exist.")
})

// CONNECTING TO THE SERVER
app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`)
}
)
