// index.js
const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes){
  for (const pass of passTimes){
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Mext pass at ${datetime} for ${duration} seconds`);
  }
};

