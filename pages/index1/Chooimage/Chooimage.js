// pages/index1/Chooimage/Chooimage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  choimg: function () {
    var that = this
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://xx.youxuanfuwu.com/public/test', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'img',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data
            console.log(res.data)
            data = JSON.parse(data)
            console.log(data.data)
            var sta=[]
            sta[0] = data.data
            console.log(sta)
            that.setData({
              img: sta
            })
            //do something
          }
        })
      },
    })
  },
  previewimg: function(e) {
    wx.previewImage({
      current: e.target.dataset.src, // 当前显示图片的http链接
      urls: this.data.img, // 需要预览的图片http链接列表
      fail: function(err) {
        console.log('失败' + err)
      }
    })
  }
})