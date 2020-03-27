const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
//Middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.get("/", (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    console.log("error", error);
    res.status(500).json("server error!");
  }
});

app.use("/user/", require("./routes/authRoutes"));

const port = process.env.PORT || 3000;
app.listen(port);
console.log("Server listening at " + port);
