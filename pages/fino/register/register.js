// pages/fino/register/register.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TEL_REG: '/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/',
    time: '',
    userNam: '',
    tel: '',
    yzm: '',
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
    // var time = sessionStorage.getItem("time");
    wx.getStorage({
      key: 'time',
      success: function (res) {
        console.log(res.data)
        var time = res.data
        if (time == '' || time == null || time == 60) { } else {
          djs()
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

  },
  uname: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  telphone: function (e) {
    // tel = $(obj).val()
    this.setData({
      tel: e.detail.value
    })
  },
  sryzm: function (e) {
    // yzm = $(obj).val()
    this.setData({
      yzm: e.detail.value
    })
    console.log(this.data.yzm);
  },
  hqyzm: function (e) {
    console.log(e.currentTarget.dataset.kg)
    const num = e.currentTarget.dataset.kg;
    if (num == 0) {
      if (this.data.tel.match(this.data.TEL_REG)) {
        wx.request({
          type: "get",
          url: IPurl1 + "/api/sms/sendsmsweb/" + appkey + "/" + tel,
          success: function (msg) {
            console.log(msg);
            if (msg.code == 200) {
              // alert(msg.errdes)
              wx.showToast({
                title: msg.errdes,
                icon: 'success',
                duration: 2000
              })
              // $(obj).attr('onclick', 'hqyzm(this,1)')
              // sessionStorage.setItem("time", 60)
              wx.setStorage({
                key: "time",
                data: "60"
              })
              djs()
            }

          },
          error: function () {
            // alert('发送失败')
            wx.showToast({
              title: '发送失败',
              icon: 'none',
              duration: 2000
            })
          }
        })
      } else {
        // alert("请输入正确的手机号")
        wx.showToast({
          title: '请输入正确的手机号',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  djs: function () {

  }
})