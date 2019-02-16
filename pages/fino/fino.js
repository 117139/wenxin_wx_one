// pages/fino/fino.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:34,
    pid:2,
    TEL_REG: '/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/',
    time:'',
    userNam: '',
    tel: '',
    yzm:'',
    p_bg_img: 'http://webqiniu.51fth.com/tupian/shangjia/20190123165956687.jpg',
    f_list: [],
    dt_list: [],
    msg_list: [],
    dt_len: '',

    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.showLoading({
      title: '',
    })
    var that =this
    that.jiazai()
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
  onPullDownRefresh: function() {//下拉加载
    this.jiazai()
    setTimeout(() => {
      wx.stopPullDownRefresh({
        complete: function (res) {
          console.log("下拉")
        }
      },1000)
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("页面上拉触底")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  uname: function(e){
    this.setData({
      userName: e.detail.value
    })
  },
  telphone:  function(e) {
    // tel = $(obj).val()
    this.setData({
      tel: e.detail.value
    })
  },
  sryzm:  function (e) {
    // yzm = $(obj).val()
    this.setData({
      yzm: e.detail.value
    })
    console.log(this.data.yzm);
  },
  hqyzm: function(e) {
    console.log(e.currentTarget.dataset.kg)
    const num = e.currentTarget.dataset.kg;
    if (num == 0) {
      if (this.data.tel.match(this.data.TEL_REG)) {
        wx.request({
          type: "get",
          url: IPurl1 + "/api/sms/sendsmsweb/" + appkey + "/" + tel,
          success: function(msg) {
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
          error: function() {
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
  open_sign_up: function() {
      console.log(0)
      wx.requestPayment({
        timeStamp: '',
        nonceStr: '',
        package: '',
        signType: '',
        paySign: '',
      })
  },
  jiazai:function(){
    var that = this
    /*banner*swiper */
    wx.request({
      url: app.IPurl1 + '/project/projectdetile/' + that.data.pid,
      dataType: 'json',
      success: function (res) {
        // console.log(res.data)
        if (res.data.code == 200) {
          that.setData({
            // p_bg_img: res.data.retvalue.img
            imgUrls: res.data.retvalue.listpicture
          })
        } else {
          wx.showToast({
            title: res.data.errdes,
          })
        }
      }
    })
    /*biaoqian */
    wx.request({
      url: app.IPurl1 + '/function/selectfunction/' + that.data.pid,
      dataType: 'json',
      success: function (res) {
        //  console.log(res.data.retvalue)
        if (res.data.code == 200) {
          that.setData({
            f_list: res.data.retvalue
          })
          // console.log(that.data.f_list)
        } else {
          wx.showToast({
            title: res.data.errdes,
          })
        }
      }
    })
    /*dt */
    wx.request({
      url: app.IPurl1 + '/trends/selecttrends',
      data: { type: 1, project_id: that.data.pid },
      dataType: 'json',
      success: function (res) {
        // console.log(res.data.retvalue)
        if (res.data.code == 200) {
          that.setData({
            dt_list: res.data.retvalue.list,
            dt_len: res.data.retvalue.allRow
          })
          // console.log(that.data.dt_list)
        } else {
          wx.showToast({
            title: res.data.errdes,
          })
        }
      }
    })
    wx.request({
      url: app.IPurl1 + '/message/typehoutaimassage/1/' + that.data.pid,
      dataType: 'json',
      success: function (res) {
        console.log(res.data.retvalue)
        if (res.data.code == 200) {
          that.setData({
            msg_list: res.data.retvalue
          })
          // console.log(that.data.msg_list)
        } else {
          wx.showToast({
            title: res.data.errdes,
          })
        }
      }
    })
    wx.hideLoading()
  }
})