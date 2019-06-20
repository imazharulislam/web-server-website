// const request = require('request');
const geocode = require('./geocode');
const forecast = require('./forecast');


const address = process.argv[2];
if(address){
    geocode(address, (err, {latitude,longitude,location} ) => {
        if(err){
            return console.log(err)
        } else {
        
        forecast(latitude,longitude, (forcastErr,forcastData) => {
            if(err) console.log(forcastErr)
            console.log( location);
            console.log(forcastData);
        })
        } //else brackets.
    }) //main
    
} else {
    console.log('Please Provid a address!');
}
// const url = 'https://api.darksky.net/forecast/11ddc71691c9cb12702a6b1fb8f94cda/24.886436,24.886436?lang=es';
// const urlTwo = `https://api.mapbox.com/geocoding/v5/mapbox.places/sylhet.json?access_token=pk.eyJ1IjoiaW1hemhhcnVsIiwiYSI6ImNqdzVhemZneDA3a2Y0YWx3ZDk3bXBqcGQifQ.eDsWVk3yM8P3qM5jFwrUTA&limit=1`;
