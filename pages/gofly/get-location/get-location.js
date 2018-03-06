var util = require('../../api/util.js')
var formatLocation = util.formatLocation

Page({
  data: {
    hasLocation: false,
  },

onLoad:function(){
  var that = this
  wx.getLocation({
    success: function (res) {
      console.log(res)
      that.setData({
        hasLocation: true,
        location: formatLocation(res.longitude, res.latitude)
      })
      wx.request({
        url: 'https://api.seniverse.com/v3/weather/now.json?key=fdw9qkun1btvenxt&location=39.93: 116.40&language=zh-Hans&unit=c',
        success: function (result) {
          that.setData({
            nowInfo: result.data.results[0]
          })
        },
        fail: function ({ errMsg }) {
          console.log('request fail', errMsg)
        }
      })
    }
  })
},

  getLocation: function () {
    var that = this
    wx.getLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          hasLocation: true,
          location: formatLocation(res.longitude, res.latitude)
        })
      }
    })
  },
  clear: function () {
    this.setData({
      hasLocation: false
    })
  },


})
