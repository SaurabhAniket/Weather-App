//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/" , function(req ,res){
   res.sendFile(__dirname + "/index.html");   
});

app.post("/" , function(req ,res){
  const query = req.body.cityName;
  const apiKey = "1980c0d9457f603002353d36b99f73b5";
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" +  query +  "&appid=" +apiKey + "&units=metric";
  
  
  https.get(url , function(response){
   console.log(response.statusCode)

   response.on("data" , function(data){
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;
      const feellike = weatherdata.main.feels_like;
      const description = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      console.log(temp)
      console.log(feellike)
      console.log(description)
      res.write("<h1> The Weather Description is " + description + ". </h1>")
      res.write( "<h1> The temperature in " + query + " is " + temp + " Degress Celcuis .</h1>")
      res.write("<img src=" + imageURL + ">");
      res.send();
    });

  });
 
});




app.listen(3000, function(){
    console.log("Server is Running on Port 3000")
});