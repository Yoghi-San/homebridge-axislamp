var request = require("request");
var Service, Characteristic;

// "accessories": [
//   {
//     "accessory": "AxisLight",
//     "name": "Axis Light",
//     "password": "qwe123",
//     "ip": "192.168.129.100",
//     "light_id": "1"
//   }
// ]

module.exports = function (homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("axis-light", "AxisLight", AxisLight);
};

function AxisLight(log, config) {
  this.currentState = false;

  this.log = log;
  this.accessToken = config["api_token"];

  // Vars from custom config
  this.name = config["name"];
  this.password = config["password"];
  this.ip = config["ip"];
  this.light_id = config["light_id"];

  // Init Switch Service
  this.service = new Service.Switch(this.name);
  this.service
  .getCharacteristic(Characteristic.On)
  .on('get', this.getState.bind(this))
  .on('set', this.setState.bind(this));
}

AxisLight.prototype.getState = function(callback) {
  return callback(null, this.currentState);
}

AxisLight.prototype.setState = function(state, callback) {
  this.currentState = !this.currentState;
  return callback(null);
}

AxisLight.prototype.getServices = function() {
  return [this.service];
}
