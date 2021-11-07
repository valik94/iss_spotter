const request = require('request');

const fetchMyIP = function(callback) { 
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', function(error, response, body) {
  if (error) {
      callback(error, null);
      return;
    }
 // if non-200 status, assume server error
 if (response.statusCode !== 200) {
  const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
  callback(Error(msg), null);
  return;
}
//Parse the body message for to remove the string quotes and select to point to ip key.
const data = JSON.parse(body).ip;
    //console.log(data)
callback(null, data);
});
}

const fetchCoordsByIP = function(ip, callback) {
  request('https://api.freegeoip.app/json/?apikey=d63eab10-3f63-11ec-81c9-9be2df380be3', function(error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
 // if non-200 status, assume server error
 if (response.statusCode !== 200) {
  const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
  callback(Error(msg), null);
  return;
}
  const {latitude, longitude } = JSON.parse(body);
  callback(null, { latitude, longitude });  });
}

const fetchISSFlyOverTimes = function (coords, callback){
    request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, function(error, response, body) {
      if (error) {
        callback(error, null);
        return;
      }
   // if non-200 status, assume server error
   if (response.statusCode !== 200) {
    const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
    callback(Error(msg), null);
    return;
  }
    const passes= JSON.parse(body).response;
    console.log(passes);
    callback(null, passes);  
  });
}
const nextISSTimesForMyLocation = function (callback){
  
  fetchMyIP((error, ip) =>{
    if (error){
      return callback (error, null);
    }
    fetchCoordsByIP(ip, (error,loc) =>{
      if (error){
        return callback(error,null);
      }
      fetchISSFlyOverTimes(loc, (error, Passes) =>{
        if (error){
          return callback(error,null);
        }
        callback(null, Passes);
      })
    });
  });
}

module.exports ={ nextISSTimesForMyLocation};