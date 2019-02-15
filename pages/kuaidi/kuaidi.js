// pages/kuaidi/kuaidi.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gs: null,
    expressNu: null,
    listnew: [

      { datetime: "2018-04-28 16:23:08", remark: "【苏州市】【常熟天下淘宝二十二】（15062585928）的何丹塘市（13776225553）已揽收", zone: "" },
      { datetime: "2018-04-28 19:03:34", remark: "【苏州市】快件到达【常熟】", zone: "" },
      { datetime: "2018-04-28 19:09:21", remark: "【苏州市】快件离开【常熟】发往【太原中转】", zone: "" },

      { datetime: "2018-04-28 23:30:39", remark: "【上海市】快件到达【上海航空部】", zone: "" },

      { datetime: "2018-04-28 23:32:26", remark: "【上海市】快件离开【上海航空部】发往【太原中转】", zone: "" },

      { datetime: "2018-04-29 19:40:51", remark: "【晋城市】快件到达【晋城分拨中心】", zone: "" },

      { datetime: "2018-04-30 01:42:21", remark: "【太原市】快件离开【太原中转】发往【太原水西关】", zone: "" },

      { datetime: "2018-04-30 08:18:43", remark: "【太原市】快件到达【太原水西关】", zone: "" },

      { datetime: "2018-05-02 08:12:26", remark: "【太原市】【太原水西关】的郭华龙（15364913787）正在第1次派件,请保持电话畅通,并耐心等待",},
      { datetime: "2018-05-02 12:52:32", remark: "【太原市】快件已在【太原水西关】签收,签收人:门卫,感谢使用中通快递,期待再次为您服务!"}
    ],
    coms1: [],
    coms: [
      {
        "com": "顺丰",
        "no": "sf"
      },
      {
        "com": "申通",
        "no": "sto"
      },
      {
        "com": "圆通",
        "no": "yt"
      },
      {
        "com": "韵达",
        "no": "yd"
      },
      {
        "com": "天天",
        "no": "tt"
      },
      {
        "com": "EMS",
        "no": "ems"
      },
      {
        "com": "中通",
        "no": "zto"
      },
      {
        "com": "汇通",
        "no": "ht"
      },
      {
        "com": "全峰",
        "no": "qf"
      },
      {
        "com": "德邦",
        "no": "db"
      },
      {
        "com": "国通",
        "no": "gt"
      },
      {
        "com": "如风达",
        "no": "rfd"
      },
      {
        "com": "京东快递",
        "no": "jd"
      },
      {
        "com": "宅急送",
        "no": "zjs"
      },
      {
        "com": "EMS国际",
        "no": "emsg"
      },
      {
        "com": "Fedex国际",
        "no": "fedex"
      },
      {
        "com": "邮政国内（挂号信）",
        "no": "yzgn"
      },
      {
        "com": "UPS国际快递",
        "no": "ups"
      },
      {
        "com": "中铁快运",
        "no": "ztky"
      },
      {
        "com": "佳吉快运",
        "no": "jiaji"
      },
      {
        "com": "速尔快递",
        "no": "suer"
      },
      {
        "com": "信丰物流",
        "no": "xfwl"
      },
      {
        "com": "优速快递",
        "no": "yousu"
      },
      {
        "com": "中邮物流",
        "no": "zhongyou"
      },
      {
        "com": "天地华宇",
        "no": "tdhy"
      },
      {
        "com": "安信达快递",
        "no": "axd"
      },
      {
        "com": "快捷速递",
        "no": "kuaijie"
      }
    ]
  },
  btnClick: function () {
    var that = this
    var coms = this.data.coms
    // for (var i in coms) {
    //   //表示遍历数组，而i表示的是数组的下标值，
    //   //result[i]表示获得第i个json对象即JSONObject
    //   //result[i]通过.字段名称即可获得指定字段的值
    //   if (coms[i].com == this.data.gs) {
    //     console.log(coms[i].com)
    //     this.data.gs = coms[i].no
    //   }
    // }
    this.setData({
      gs: coms[this.data.index].no,
    })
    app.getExpressInfo(this.data.gs, this.data.expressNu, function (data) {
      that.setData({
        listnew: data.result.list.reverse()
      })
      wx.showModal({
        title: '提示',
        content: JSON.stringify(that.data.listnew[0]),
        duration: 2000
      })
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
    })
  },
  input: function (e) {
    this.setData({
      gs: e.detail.value
    })
     console.log(e.detail.value)
  },
  input1: function (e) {
    this.setData({
      expressNu: e.detail.value
    })
    // console.log(e.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var aa = []
    for (var i = 0; i < this.data.coms.length - 1; i++) {
      aa.push(this.data.coms[i].com)
    }
    this.setData({
      coms1: aa
    })
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