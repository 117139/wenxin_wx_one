// pages/index1/audio/audio.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    wx.playBackgroundAudio({
      dataUrl: 'http://fs.w.kugou.com/201805211501/72b6d7d76276f1afdea397a7d343ef00/G063/M04/16/01/34YBAFatc_aAL3AVADolq6uxGIw548.mp3',
      success: function () {

      },
      fail: function () {

      },
      complete: function () {

      }
    })
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
  stop:function(){
    wx.pauseBackgroundAudio()
  },
  s1:function(){
    wx.getBackgroundAudioPlayerState({
      success:function(res){
        console.log(res)
      }
    })
  }
})