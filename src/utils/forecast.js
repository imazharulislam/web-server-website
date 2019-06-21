const request = require('request')
function forecast(latitude,longitude,callback){
	const url = 'https://api.darksky.net/forecast/11ddc71691c9cb12702a6b1fb8f94cda/' + latitude
	 +  ',' +  longitude;
   request({url: url, json: true}, (err,{body} = {}) => {
   	if(err){
   		callback('unable to connect to the api . please check your network',undefined);
    } else if(body.code) {
    	callback('please provide a valid address', undefined);
    } else {
    	callback(undefined, `the summary of the place is ${body.currently.summary} and icon is ${body.currently.icon}. temperature is ${body.currently.temperature}`);
    }	
   });
}
module.exports = forecast;