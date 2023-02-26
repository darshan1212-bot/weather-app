const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    const query = req.body.cityname;
    const apikey = "a3c75051f4eaf0f828cf6e3ce8ee1f62";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey;
    https.get(url, function (response) {
        // console.log(res);

        response.on("data", function (data) {
            // const datas = JSON.parse(data);
            // console.log(datas);
            // const object = {
            //     name :"Darshan",
            //     city : "Rajkot"
            // }
            // console.log(JSON.stringify(object));
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const descrip = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            // console.log(temp);
            res.write("<h1>The Temperature of " + query + " is " + temp + " degrees calcius </h1>");
            res.write("<p>The Weather is currently " + descrip + "</p>")
            res.write("<img src=" + imageurl + ">");
            res.send()
        })
    })
})

app.listen(port, () => {
    console.log("Server started on port " + port);
})