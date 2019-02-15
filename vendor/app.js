var app = getApp()

/**
 * 取模块数据
 */
function getModules(types, cb) {
  wx.showLoading({
    title: '加载中...',
  })

  wx.request({
    url: app.siteInfo.domain + '/app/index.php?c=wxapp&a=module&do=nav&uniacid=' + app.siteInfo.uniacid + '&type=' + types,
    method: 'GET',
    success: function (res) { 
      wx.hideLoading()

      if (res.data.errno == 0) {
        typeof cb == 'function' && cb(res)
      } else {
        failGo(res.data.message)
      }
    },
    fail: function (res) {
      wx.hideLoading()
      failGo('加载失败')
      console.log(res)
    }
  })
}

function getModulesById(id, cb) {
  wx.showLoading({
    title: '加载中...',
  })

  wx.request({
    url: app.siteInfo.domain + '/bale/module.php?uniacid=' + app.siteInfo.uniacid + '&id=' + id,
    method: 'GET',
    success: function (res) {
      wx.hideLoading() 
      if (res.data.errno == 0) {
        typeof cb == 'function' && cb(res)
      } else {
        failGo(res.data.message)
      }
    },
    fail: function (res) {
      wx.hideLoading()
      failGo('加载失败')
      console.log(res)
    }
  })
}

function getModulesByPid(id, cb) {
  wx.showLoading({
    title: '加载中...',
  })

  wx.request({
    url: app.siteInfo.domain + '/bale/module.php?uniacid=' + app.siteInfo.uniacid + '&id=' + id + '&t=3',
    method: 'GET',
    success: function (res) {
      wx.hideLoading()

      if (res.data.errno == 0) {
        typeof cb == 'function' && cb(res)
      } else {
        failGo(res.data.message)
      }
    },
    fail: function (res) {
      wx.hideLoading()
      failGo('加载失败')
      console.log(res)
    }
  })
}

/**
 * 错误提示
 */
function failGo(content) {
  wx.showModal({
    title: '提示',
    content: content,
    showCancel: false,
    success: function(res) {
      if (res.confirm) {
        wx.redirectTo({
          url: '/pages/default/index/index',
        })
      }
    }
  })
}

module.exports = {
  'getModules': getModules,
  'getModulesById': getModulesById,
  'getModulesByPid': getModulesByPid,
  'failGo': failGo
}