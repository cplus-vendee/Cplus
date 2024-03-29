const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const path = require("path");
const user = require("../routes/user");
const vehicule = require("../routes/vehicule");
const deals = require("../routes/deals");
const InitiateMongoServer = require("../config/db");

// Initiate Mongo Server
InitiateMongoServer();

const app = express();


// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// app.get("/", (req, res) => {
//   res.json({ message: "API Working" });
// });

// app.engine('html', require('ejs').renderFile);
// app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res){
  // app.use(express.static(path.join('../index.html', 'public')));
  res.json({ message: "API Working", "use" : "https://julienbardin.github.io/Cplus/login.html" });
  // res.render('../login.html');
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);
app.use("/vehicule", vehicule);
app.use("/deals", deals);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
