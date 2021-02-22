const express = require("express");
const path = require("path");
const hbs = require("hbs");
require("./db/connection");
const app = express();
const PORT = process.env.PORT || 3001;

// FOR PARSING THE JSON , WE DONT HAVE TO USE UN-NECESSARY BODY-PARSER PACKAGE BCS THE METHOD IS AVAILABLE INSIDE THE EXPRESS
app.use(express.json());

// // SETTING THE PATH
// const staticPath = path.join(__dirname, "../public");
// app.use(express.static(__dirname + '/public'));

// // MIDDLEWARE
// app.use(express.static(staticPath))

app.set("view engine", "hbs")

const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// HOMEPAGE
app.get("/", (req, res) => {
  res.render("index")
})

// ROUTES THAT NOT BEEN DEFINED
app.get("*", (req, res) => {
  res.send("You've tried reaching a route that doesn't exist.")
})

// CONNECTING TO THE SERVER
app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`)
}
)




// app.use("/css", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
// app.use("/js", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
// app.use("/jq", express.static(path.join(__dirname, "../node_modules/jquery/dist")))