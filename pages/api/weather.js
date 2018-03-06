//获取当前的经纬度
function getLocation(callback) {
  wx.getLocation({
    success: function (res) {
     // var newLocation = "'" + res.latitude + ":" + res.longitude + "'";
     console.log(res);
      callback(true, res.latitude, res.longitude);
    },
    fail: function () {
      callback(false);
    }
  })
}

module.exports = {
  //loadWeatherData: loadWeatherData
  getLocation: getLocation
}