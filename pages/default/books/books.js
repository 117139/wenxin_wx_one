// pages/default/books/books.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zk11:false,
    zk22:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },


  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.request({
      url: 'https://www.biquge5.com/s.php', // 仅为示例，并非真实的接口地址
      data: {
        x: e.detail.value,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })
  },
  zk1() {
    console.log(this.data.zk11)
    this.setData({
      zk11: !this.data.zk11
    })
  },
  zk2() {
    console.log(this.data.zk22)
    this.setData({
      zk22: !this.data.zk22
    })
  }
})