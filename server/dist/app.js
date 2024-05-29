const express = require("express");
const bodyparser = require("body-parser");
const cookieParser = require('cookie-parser');

var app = express();
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:1234");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyparser.json());
app.use(cookieParser());

app.get("/", (req, res, next) => {
  res.json([
    { product: "Orange Juice", amount: 1, synced: "true" },
    { product: "Mushrooms", amount: 2, synced: "true" },
    { product: "Eggs", amount: 6, synced: "true" }
  ]);
});

app.post("/", (req, res, next) => {
  console.log("Received post request", req.body);
  res.send(req.body);
});

app.get("/cookie", (req, res, next) => {
  if (req.cookies.Favorite) {
    console.log("Received cookie from call: ", req.cookies.Favorite);
    res.send(`Cookie sent to server:<br/>Name: <em>Favorite</em><br/>Value: <em>${req.cookies.Favorite}</em>`);
  }
  else {
    res.cookie("Favorite", "Chocolate", { maxAge: 3600 }).send("Cookie created by server:<br/>Name: <em>Favorite</em><br/>Value: <em>Chocolate</em>");
  }
});