const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoute");
const postRoutes = require('./routes/postRoute');



const app = express();


mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.connect("mongodb+srv://chaim:cohen1234@recipes-app-4ow1o.mongodb.net/recipes-app?retryWrites=true&w=majority", function(err, db) {
  if (!err) {
    console.log("We are connected");
  } else if (err) {
    console.log(err);
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images-users", express.static(path.join("server/images-users")));
app.use("/images-posts", express.static(path.join("server/images-posts")));
app.use(cors())


app.use("/api/user", userRoutes);
app.use('/api/post', postRoutes);





module.exports = app;
