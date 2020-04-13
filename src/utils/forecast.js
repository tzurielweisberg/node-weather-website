
const request = require('request');

const forecast = (latitude, longtitude, callback) => {
  //whether from darksky
  const url = 'https://api.darksky.net/forecast/a266599aed8af692f9b6d8db246757fb/' + latitude + ',' + longtitude + '?units=si';
  //1st arg options (url etc) 2nd arg is what func to run when its finished
  request({ url, json : true}, (error, {body})=>{

    if (error){
      callback('unable to connect to wheather service',undefined);
    }
    //returns a body but with an error property 
    else if (body.error){
      callback('unable to find location', undefined);
    }
    else {
      callback(undefined, 
        body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + "% chance of rain."
        )
    }
  })

}
module.exports = forecast;