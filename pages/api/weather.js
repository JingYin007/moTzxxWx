//获取当前的经纬度
function getLocation(callback) {

  wx.getLocation({

    success: function (res) {

      callback(true, res.latitude, res.longitude);

    },
    fail: function () {

      callback(false);

    }

  })

}

//获取天气状况
function getWeatherData() {


  wx.request({
    url: 'https://api.seniverse.com/v3/weather/now.json?key=fdw9qkun1btvenxt&location=beijing&language=zh-Hans&unit=c',
    data: {
      noncestr: Date.now()
    },
    success: function (result) {
      wx.showToast({
        title: '请求成功',
        icon: 'success',
        mask: true,
        duration: duration
      })
      console.log('request success', result)
    },

    fail: function ({ errMsg }) {
      console.log('request fail', errMsg)
    }
  })
}