const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const apiKey = '42a6e37ccee2db2848b0770c6a89cf8c';


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {name: null, error: null});
});

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url, function (err, response, body) {
        if(err){
            res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
            let weather = JSON.parse(body);
            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again'});
            } else {
                console.log(body);
                let name = "Weather in "+weather.name;
                let temp = "Temperature: "+weather.main.temp+" degrees celsius";
                let pressure = "Pressure: "+weather.main.pressure+" mb";
                let humidity = "Humidity: "+weather.main.humidity+" %";


                res.render('index', {name:name,temp:temp,pressure:pressure,humidity:humidity,error: null});
            }
        }
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});