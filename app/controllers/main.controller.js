// Create and Save a new Tutorial
// import config from '../config/config';
const {IP2Location} = require("ip2location-nodejs");

exports.get_weather = (req, res) => {
  console.log(req.connection.remoteAddress);
  var requestIp = req.connection.remoteAddress;
  // var requestUrl = config.weather_api_url + '?ip'
  // https://api.ip2location.com/v2/?ip=188.43.136.41&key=MOHEUZUJXT&package=WS25

};

