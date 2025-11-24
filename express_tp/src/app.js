const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const path = require("path");

require("./config/passport"); 

const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");

const app = express();


mongoose.connect("mongodb://127.0.0.1:27017/auth_demo")
  .then(() => console.log(" Connected to MongoDB"))
  .catch(err => console.error(err));


app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(session({
  secret: "safae_secret_key",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use("/", authRoutes);
app.use("/books", bookRoutes);


const PORT = 3000;
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
