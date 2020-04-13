const request = require('request');


const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidHp1cmllbHciLCJhIjoiY2s2OWt6ZWd6MGZvZDNncm5xYmhwNjlwdSJ9.Ih3oMvn4LMTfmrr_xKUTZA&limit=1';
  request({url, json : true}, (error, {body})=>{
    if (error){
      callback('unable to connect to location service', {latitude: body.features[0].center[1],
        longtitude: body.features[0].center[0],
        location: body.features[0].place_name});
    } else if ( body.features.length === 0 ){
      callback('unable to find the location, try another search', undefined);
    } else{
      callback(undefined,{
        latitude: body.features[0].center[1],
        longtitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode;