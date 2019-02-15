// pages/index1/wxui/wxui.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    st: 0,
    ys:''
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
  scrollToUpper: function (event) {
    console.log(event)
    wx.showToast({
      title: '触顶',
    })
  },
  scrollTolower: function (event) {
    console.log(event)
    wx.showToast({
      title: '触底',
    })
  },
  scroll: function (event) {
    // console.log(event)
  },
  click: function () {
    console.log(this.data.st)
    if (this.data.st == 0) {
      wx.showToast({
        title: '触顶',
      })

    } else {
      this.setData({
        st: this.data.st - num * 50
      })
    }
  },
  click1: function () {
    console.log(this.data.st)
    if (this.data.st == 550) {
      wx.showToast({
        title: '触底',
      })

    } else {
      this.setData({
        st: this.data.st + 50
      })
    }
  },
  ck: function (event) {
    console.log(event)
   var sts=event.target.dataset.hi
   this.setData({
     ys: sts
   })
  }
})