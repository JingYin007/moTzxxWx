const paymentUrl = require('../../../config').paymentUrl

var app = getApp()
const openid = 'o0rJUwexa08tg4pyFi1tkvJKhxHY'
Page({
  onLoad: function () {
  },
  requestPayment: function () {
    var self = this
    self.setData({
      loading: true
    })
    // 此处需要先调用wx.login方法获取code，然后在服务端调用微信接口使用code换取 下单用户 的openId
    // 具体文档参考 https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html?t=20161230#wxloginobject
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          console.log('code:' + res.code)
          wx.request({
            url: 'https://api.seniverse.com', //此处应在后台根据得到的 code 获取用户的openid
            data: {
              code: res.code
            },
            success: function (res) {
              console.log('拉取openid成功', res)
              self.setData({
                openid: 'o0rJUwexa08tg4pyFi1tkvJKhxHY' //此处假设已经获得了用户的openID
              })
              //唤醒微信支付
              wx.request({
                //访问服务端 微信支付接口 paymentUrl，从而获取后面所需的重要参数
                url: 'https://api.seniverse.com/v3/weather/now.json?key=fdw9qkun1btvenxt&location=beijing&language=zh-Hans&unit=c',
                data: {
                  openid
                },
                method: 'GET',
                success: function (res) {
                  var timestamp = Date.parse(new Date());
                  timestamp = timestamp / 1000; 

                  var payargs = res.data.payargs
                  wx.requestPayment({
                    timeStamp: timestamp+'',
                    nonceStr: 'payargs.nonceStr',
                    package: 'payargs.package',
                    signType: 'MD5',
                    paySign: 'payargs.paySign',
                    'success': function (res) {
                      console.log('支付-success')
                    },
                    'fail': function (res) {
                      wx.showToast({
                        title: '支付测试中...',
                        icon: 'fail',
                        image: '',
                        duration: 2000,
                        mask: true,
                        success: function (res) { },
                        fail: function (res) { },
                        complete: function (res) { },
                      })
                      console.log('支付-fail')
                    }
                  })

                  self.setData({
                    loading: false
                  })
                }
              })

            },
            fail: function (res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              self.setData({
                loading: false
              })
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  }
})
