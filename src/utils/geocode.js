const request = require('request');

function geocode(location, callback){
    const url  = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?limit=1&access_token=pk.eyJ1IjoiaW1hemhhcnVsIiwiYSI6ImNqdzVhemZneDA3a2Y0YWx3ZDk3bXBqcGQifQ.eDsWVk3yM8P3qM5jFwrUTA`;
    request({url, json: true }, (err,{body} = {}) => {
        if(err){
            callback('unable to connect to the api . please check your network setting');
        } else if(body.features== null || body.message){
            callback('plasse provide a valid location.', undefined)
        } 
        else{
            callback(undefined , { location:  body.features[0].place_name, longitude: body.features[0].center[0],latitude: body.features[0].center[1]  });
        }

    })

}

module.exports = geocode;