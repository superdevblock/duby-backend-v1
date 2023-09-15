var express = require("express");
var router = express.Router();

var database = require("./database.js");

router.get("/", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  let rows = await database.select("transactions", []);

  res.send(JSON.stringify(rows));
});

router.get("/missed", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  let rows = await database.selectMissed("transactions", {});

  res.send(JSON.stringify(rows));
});

router.get("/missed/:cid/:t_token_addr", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  let cid = req.params.cid;
  let t_token_addr = req.params.t_token_addr;

  let rows = await database.selectMissed("transactions", {
    tChainID: cid,
    tToken: t_token_addr,
  });

  res.send(JSON.stringify(rows));
});

router.get("/:chainID", function (req, res) {});

router.get("/:chainID/:address", function (req, res) {});

//export this router to use in our index.js
module.exports = router;
