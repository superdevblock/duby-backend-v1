var express = require("express");
var app = express();

var swap = require("./app/swap.js");
var history = require("./app/history.js");
var config = require("./app/config.js");

app.use("/swap", swap);
app.use("/conf", config);
app.use("/history", history);

app.listen(3000);
