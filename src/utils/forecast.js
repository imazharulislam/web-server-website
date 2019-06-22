const request = require('request')
function forecast(latitude,longitude,callback){
	const url = 'https://api.darksky.net/forecast/11ddc71691c9cb12702a6b1fb8f94cda/' + latitude
	 +  ',' +  longitude+ '?units=ca';
   request({url: url, json: true}, (err,{body} = {}) => {
   	if(err){
   		callback('unable to connect to the api . please check your network',undefined);
    } else if(body.code) {
    	callback('Unable to find location. Try another search.', undefined);
    } else {
		callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degress out. This high today is ${body.daily.data[0].temperatureHigh} with a low of ${body.daily.data[0].temperatureLow}.There is a ${body.currently.precipProbability}% chance of rain.`);
    }	
   });
}
module.exports = forecast;