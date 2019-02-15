// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wenz: [
      {
        title:"遇见是两个人的事，分开却是一个人的决议；遇见是一个开端，分开却是为了遇见下一个分开。这是一个盛行分开的世界，但是我们都不擅长辞别。",
        zz:"———米兰·昆德拉"
      },
      {title:'别人都在关注你飞得高不高、快不快时，只有他在关心你飞得累不累，这是朋友。别人关注你钱多钱少、官大官小时，只有她在关心你是胖了瘦了，那是母亲。———《黑暗中的舞者》台词',
        zz: "———米兰·昆德拉"
        },
      {title:'男孩喜欢上了女孩，他向她表白，女孩回绝了，她说：我整整比你大一岁。男孩说：我一个月大时，你十三个月大。你是我的十三倍。我两个月时，你十四个月。你是我的七倍。我一岁时，你两岁，你是我的两倍。只需你愿意和我永远在一同，我们总在渐渐接近。———美丽的情话'},
      {title:'我问佛：如果遇到了可以爱的人，却又怕不能把握怎样办？佛曰：留人间多少爱，迎浮世千重变；和有情人，做快乐事，别问是劫是缘———患得患失，连眼前的快乐都会失去'},
      {title:'任何一种环境或一个人，初次见面就预见到分手的隐痛时，你必定爱上他了。———黄永玉《沿着塞纳河到翡冷翠》'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("test onLoad")

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("test onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("test onShow")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("test onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("test onUnload")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("test onPullDownRefresh")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("test onPullDownRefresh")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("test onShareAppMessage")
  },
  itemClick: function () {
    wx.navigateTo({
      url: '../test_page/test_page?id=1',
    })
    // wx.redirectTo({
    //   url: '../test_page/test_page',
    // })
  }
})