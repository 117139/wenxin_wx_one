// pages/fino/project_item/project_item.js
var WxParse = require('../../../vendor/wxParse/wxParse.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  type:'',
    id: '',
    pid: '',
    uid: '',
    con: '',
    width: '',
    height: '',
    v_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.f_type)
    this.setData({
      type: options.f_type,
      id: options.id,
      pid: options.pid,
      uid: options.uid,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this;
    wx.request({
      url: app.IPurl1 + '/function/functiondetile/' + this.data.id,
      dataType: 'json',
      success: function (res) {
        // console.log(res.data.retvalue.img)
        if (res.data.code == 200) {
         
          if (that.data.type == 2) {
            that.setData({
              v_list: res.data.retvalue.detiles == null ? '[]' : res.data.retvalue.detiles
            })
          } else if (that.data.type == 1) {
            var article = res.data.retvalue.function.content
            console.log(article)
            WxParse.wxParse('article', 'html', article, that, 5);
            wx.hideLoading();
            that.setData({
              con: res.data.retvalue.function.content
            })
          }
        } else {
          wx.showToast({
            title: res.data.errdes,
          })
        }
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
  
  }
})