// pages/fino/project_msg/project_msg.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    txt: '',
    len:0,
    type1: '',
    id: '',
    pid: '',
    uid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      txt:'',
      type1: options.f_type,
      id: options.id,
      pid: options.pid,
      uid: options.uid,
    })
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
  jishu: function(e) {
    console.log(e.detail)
    this.setData({
      txt: e.detail.value,
      len: e.detail.cursor,
    })
  },
  save_msg:function (){
    var that =this
    if (that.data.id== null){
      that.setData({
        id: that.data.pid
      })
    }
    if (that.data.txt == "") {
      
      wx.showToast({
        title: '请填写留言内容',
      })
    } else {
      wx.request({
        url: app.IPurl1 + '/message/savemessage',
        dataType: 'json',
        data: { user_id: 0, project_id: that.data.id, content: that.data.txt, type: that.data.type1, xm_id: that.data.pid },
        success: function (res) {
          if (res.data.code == 200) {
            wx.showToast({
              title: '提交成功',
            })
            // wx.redirectTo({
            //   url: "../../fino/fino?uid=" + that.data.uid + '&pid=' + that.data.pid,
            //   complete:function(res){
            //     console.log(res)
            //   }
            // })
            setTimeout(function () {
              wx.switchTab({
                url: '../fino'
              })
            }, 1500)
            
          } else {
            // layer.msg(back.errdes)
            wx.showToast({
              title: res.data.errdes,
            })
          }
        }
      })
    }
  }
})