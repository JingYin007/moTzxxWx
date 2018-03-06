//index.js
//获取应用实例
var util_weather = require('../api/util.js')
var formatLocation = util_weather.formatLocation
const app = getApp()

Page({
  data: {
    weatherInfo: {},
    newLocation: {},
    lifeInfo: {},
    nowInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onReady: function () {
    //初始化加载数据
    var self = this
    //获取定位信息 经纬度
    wx.getLocation({
      success: function (res) {
        //初始化【北京】经纬度  location=39.93:116.40（格式是 纬度:经度，英文冒号分隔） 
        var newLocation = '39.93:116.40';
        if (res) { newLocation = res.latitude + ":" + res.longitude }
        self.setData({
          newLocation: newLocation
        })

        //初始化获取 当前的天气状况
        wx.request({
          url: 'https://api.seniverse.com/v3/weather/now.json?key=fdw9qkun1btvenxt&location=' + newLocation + '&language=zh-Hans&unit=c',
          success: function (result) {
            self.setData({
              nowInfo: result.data.results[0]
            })
          },
          fail: function ({ errMsg }) {
            console.log('request fail', errMsg)
          }
        }),
          //初始化获取今天的生活指数信息
          wx.request({
            url: 'https://api.seniverse.com/v3/life/suggestion.json?key=fdw9qkun1btvenxt&location=' + newLocation + '&language=zh-Hans',
            success: function (result) {
              self.setData({
                lifeInfo: result.data.results[0].suggestion
              })
            },
            fail: function ({ errMsg }) {
              console.log('request fail', errMsg)
            }
          }),
          //初始化话获取最近三天的天气状况
          wx.request({
            url: 'https://api.seniverse.com/v3/weather/daily.json?key=fdw9qkun1btvenxt&location=' + newLocation + '&language=zh-Hans&unit=c&start=0&days=5',
            success: function (result) {
              self.setData({
                //weatherInfo: result.data.results[0]
                weatherInfo: formatDate(result.data.results[0])
              })
            },
          })
      }
    })
  },

  //页面刷新事件
  refreshPage: function () {
    var self = this
    wx.request({
      url: 'https://api.seniverse.com/v3/weather/now.json?key=fdw9qkun1btvenxt&location=' + this.data.newLocation + '&language=zh-Hans&unit=c',
      success: function (result) {
        wx.showToast({
          title: '刷新成功',
          icon: 'success',
          image: '',
          duration: 2000,
          mask: true,
        })
        self.setData({
          nowInfo: result.data.results[0]
        })
      },
      fail: function ({ errMsg }) {
        console.log('request fail', errMsg)
      }
    })
  },

  //事件处理函数
  bindViewTap: function () {
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
    } else if (this.data.canIUse) {
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})






/**
 * 将日期信息进行处理
 */
function formatDate(data) {
  for (var i = 0; i < data.daily.length; i++) {
    var date1 = data.daily[i].date.slice(5);
    var date2 = date1.replace('-', '/');
    data.daily[i].date = date2;
  }
  return data;
}

//中文形式的每周日期 (此方法暂时没用过！)
function formatWeekday(timestamp) {
  var date = new Date(timestamp * 1000);
  var weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  var index = date.getDay();
  return weekday[index];
}





