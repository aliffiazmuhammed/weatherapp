var express = require('express')
var https = require('https')


var app = express()
app.use(express.urlencoded({ extended: false }));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post('/',(req,res)=>{
    const city = req.body.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=5d3d0ec3aac4469eb80c6c3f9743a9a4&q=${city}&units=metric`
    https.get(url,(response)=>{
        console.log('hello')
        response.on("data",(data)=>{
            const weather = JSON.parse(data)
            res.send(`<h1>the weather is ${weather.main.temp},${weather.weather[0].main}</h1>`)
        })
    })
})



app.listen(3100,()=>{
    console.log("port running.....");
})