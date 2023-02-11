const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const request = require("request");

app.use(cors());
app.use(express.json());

process.on("uncaughtException", function (err) {
  console.error(new Date().toUTCString() + " uncaughtException:", err);
  console.error(err);
  console.log(err);
  process.exit(1);
});

app.listen(port, () => {
  console.log("Now node server loaded");
});

app.get(`/convert/:from/:to`, async (req, res) => {
  let result;
  const fromObj = {
    fromCurrency: req.params.from,
    toCurrency: req.params.to,
  };
  var urls = `https://api.exchangerate.host/convert?from=${fromObj.fromCurrency}&to=${fromObj.toCurrency}`;
  try {
    request.get(urls, (error, response) => {
      res.send(response.body);
    });
  } catch (error) {
    console.log(error);
  }
});
