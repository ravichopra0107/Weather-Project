//importing packages
const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

//home route get request
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

//post route
app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "83e71a175384e68d1b8b6954b1af9477";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      res.write(
        "<h1>The temp in " +
          query +
          " is " +
          temp +
          ".</h1><br><h2>The weather is " +
          weatherDescription +
          ".</h2>"
      );
      const iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<img src=" + iconUrl + ">");
    });
  });
});
//setting up port
app.listen(3000, function () {
  console.log("Server is connected on port 3000");
});
