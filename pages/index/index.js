//index.js
var util_weather = require('../api/weather.js')
//获取应用实例
const app = getApp()
const duration = 2000

Page({
  data: {
    tip: 'Hello World',
    userInfo: {},
    nowInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  btn_getWeatherData: function () {
    var self = this
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
        
        self.setData({
          nowInfo: result.data.results[0]
        })
        //console.log('request success', result)
      },

      fail: function ({ errMsg }) {
        console.log('request fail', errMsg)
      }
    })
  },
  

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})












