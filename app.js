//app.js
var appConfig = {
  IPurl: 'http://192.168.2.251:8180/fthActivitiProject',
  IPurl1: 'https://xcode.51fth.com/fth-fino/',
  uid:1,
  userimg: '',
  username:'',
  onLaunch: function () {
    console.log("app onLaunch")
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow: function () { //处于前台
    console.log('app--show--')
  },
  onHide: function () {//处于后台
    console.log('--hide--')
  },
  globalData: {
    userInfo: null
  },
  getExpressInfo: function (com, nu, cb) {
    wx.request({
      url: 'https://v.juhe.cn/exp/index?com=' + com + '&no=' + nu + '&dtype=&key=4f8bd8165f3be3ff13cf46a1b1d8e9e7',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //console.log(res.data)
        cb(res.data)
      }
    })
  },
  myData:{
    username: 'wenxin1'
  }
}
App(appConfig)