// pages/index1/animation/animation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rotate:90,
  animation:[]
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
  bindtap:function(){
    var animation = wx.createAnimation({
      duration:1000,
      timingFunction:'linear',
      delay:0,
      transformOrigin:'50% 50% 0'
    })
    animation.rotate(this.data.rotate).scale(2).step()
    animation.scale(1).step()
    this.setData({
      rotate: this.data.rotate+90,
      animation: animation.export()
    })
  }
})