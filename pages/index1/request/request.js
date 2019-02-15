// pages/index1/request/request.js
var IPurl = 'http://192.168.2.251:8180/fthActivitiProject'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    me_list:{}
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
    var that =this
  wx.request({
    url: app.IPurl + "/bpmexecute/get_sub_task/" + app.uid,
    data: {
      page: 1,
      pagesize: 4
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res)
      that.setData({
        me_list : res.data.list
      })
    },
    fail: function (res) {
      console.log(res.data)

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
  bindview:function () {
    wx.showToast({
      title: '111',
    })
    wx.request({
      url: app.IPurl+'/userinfo/user_group_info',
      data:{
        uid:1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(app.IPurl + '/userinfo/user_group_info')
        console.log(app.uid)
        app.uid=1
        console.log(app.uid)
        console.log(res.data)
      },
      fail:function(res){
        console.log(res.data)

      }

    })
  }
})