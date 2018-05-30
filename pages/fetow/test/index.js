{
  Page({

    /**
     * 页面的初始数据
     */
    data: {
      'userInfo': { 'nickName': 'Hello' }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      //初始化加载数据
      var self = this

      //微信用户的信息获取
      wx.getUserInfo({
        success: function (res) {
          self.setData({
            userInfo:res.userInfo
          })
          console.log(res.userInfo);
        }
      })

      /** 
            wx.request({
              url: 'http://fetow.com/WxApi/test',
              success: function (result) {
                self.setData({
                  testInfo: result.data['data']
                })
                console.log(result.data)
              },
              fail: function ({ errMsg }) {
                console.log('request fail', errMsg)
              }
            })*/
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
  })
}