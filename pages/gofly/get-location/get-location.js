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
