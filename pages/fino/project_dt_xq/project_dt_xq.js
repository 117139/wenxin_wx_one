// pages/fino/project_dt_xq/project_dt_xq.js
var WxParse = require('../../../vendor/wxParse/wxParse.js')
const app= getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    con: '',
    msg_list: [],
    uid:'',
    pid:'',
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      pid: options.f_id,
      uid: options.uid,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    //获取content
    wx.request({
      url: app.IPurl1 + '/trends/detiletrends/' + that.data.id,
      dataType: 'json',
      success: function (res) {
        if (res.data.code == 200) {
          var article=res.data.retvalue.content
          console.log(article)
          WxParse.wxParse('article', 'html', article, that, 5);
          wx.hideLoading();
          // console.log(aaa)
          // that.setData({
          //   con: res.data.retvalue.content
          // })
        } else {
          wx.hideLoading();
          wx.showToast({
            title: res.data.errdes,
          })
        }
      }
    })
    //获取列表
    wx.request({
      url: app.IPurl1 + '/message/typemassage/2/' + that.data.id,
      dataType: 'json',
      success: function (res) {
        if (res.data.code == 200) {
          console.log(res.data.retvalue)
          that.setData({
            msg_list: res.data.retvalue
          })
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