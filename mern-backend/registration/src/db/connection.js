// SETTING THE CONNECTION TO MONGODB
const mongoose =   require("mongoose");

const PORT = 3001;

mongoose.connect("mongodb://localhost:27017/MyApp",{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log(`Server running on port: http://localhost:${PORT}`)
})
.catch((err) => {
  console.log(err)
});