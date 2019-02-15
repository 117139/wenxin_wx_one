// pages/index1/feedback/feedback.js
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
    wx.showLoading({
      title: '加载中',
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
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

 ck:function(){
   wx.showActionSheet({
     itemList: ['A', 'B', 'C'],
     success: function (res) {
       console.log(res.tapIndex)
     },
     fail: function (res) {
       console.log(res.errMsg)
     }
   })
 },
 showModal(){
   wx.showModal({
     title: '提示',
     content: '这是一个模态弹窗',
     success: function (res) {
       if (res.confirm) {
         console.log('用户点击确定')
       } else if (res.cancel) {
         console.log('用户点击取消')
       }
     }
   }) 
 },
 showToast:function(){
   wx.showToast({
     title: '成功',
     icon: 'success',
     duration: 2000
   })
 }
})