// pages/index1/canvans/canvans.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 1
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
    setInterval(this.draw, 10)
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
  draw: function () {
    var context = wx.createContext()
    this.data.width = 20 * Math.random()
    // context.rect(50, 50, 200, 200)
    // context.stroke()
    // context.fill()
    // context.clearRect(100,100,50,50)
    // context.translate(100,100)
    // context.rotate(5 * Math.PI / 180)
    // context.rect(50, 50, 200, 200)
    // context.stroke()
    // context.rotate(5 * Math.PI / 180)
    // context.rect(50, 50, 200, 200)
    // context.stroke()
    // context.fillText('mina',50,50)
    // context.moveTo(0,50)
    // context.lineTo(100,50)
    // context.stroke()
    // context.setFontSize(20)
    // context.fillText('mina', 100, 100)
    // context.moveTo(0,100)
    // context.lineTo(200,100)
    // context.stroke()
    context.setLineWidth(this.data.width)
    context.setLineCap("round")
    context.setLineJoin("miter")
    context.setMiterLimit(10)
    context.moveTo(this.data.width, this.data.width * 2)
    context.lineTo(150, 27)
    context.lineTo(20, 54)
    context.stroke()

    context.beginPath()

    context.setMiterLimit(3)
    context.moveTo(this.data.width * 2, 70)
    context.lineTo(150, 77)
    context.lineTo(this.data.width, 104)
    context.stroke()

    wx.drawCanvas({
      canvasId: 'f_canvas',
      actions: context.getActions()
    })
  }
})