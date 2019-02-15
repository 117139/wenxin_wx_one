   var util = {};
   var app_config = getApp();
/**
    构造微擎地址,
    @params action 微擎系统中的controller, action, do，格式为 'wxapp/home/navs'
    @params querystring 格式为 {参数名1 : 值1, 参数名2 : 值2}
*/
util.url = function (action, querystring) {
    var app = getApp();
    var url = app.siteInfo.siteroot + '?i=' + app.siteInfo.uniacid + '&t=' + app.siteInfo.multiid + '&v=' + app.siteInfo.version + '&from=wxapp&';

    if (action) {
        action = action.split('/');
        if (action[0]) {
            url += 'c=' + action[0] + '&';
        }
        if (action[1]) {
            url += 'm=' + action[1] + '&';
        }
        if (action[2]) {
            url += 'do=' + action[2] + '&';
        }
    }
    if (querystring) {
        for (param in querystring) {
            if (param && querystring[param]) {
                url += 'param=' + querystring[param] + '&';
            }
        }
    }
    return url;
}

 

function getQuery(url) {
    var theRequest = [];
    if (url.indexOf("?") != -1) {
        var str = url.split('?')[1];
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            if (strs[i].split("=")[0] && unescape(strs[i].split("=")[1])) {
                theRequest[i] = {
                    'name': strs[i].split("=")[0],
                    'value': unescape(strs[i].split("=")[1])
                }
            }
        }
    }
    return theRequest;
}
/*
* 获取链接某个参数
* url 链接地址
* name 参数名称
*/
function getUrlParam(url, name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = url.split('?')[1].match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
/**
 * 获取签名 将链接地址的所有参数按字母排序后拼接加上token进行md5
 * url 链接地址
 * date 参数{参数名1 : 值1, 参数名2 : 值2} *
 * token 签名token 非必须
 */
function getSign(url, data, token) {
    var _ = require('underscore.js');
    var md5 = require('md5.js');
    var querystring = '';
    var sign = getUrlParam(url, 'sign');
    if (sign || (data && data.sign)) {
        return false;
    } else {
        if (url) {
            querystring = getQuery(url);
        }
        if (data) {
            var theRequest = [];
            for (let param in data) {
                if (param && data[param]) {
                    theRequest = theRequest.concat({
                        'name': param,
                        'value': data[param]
                    })
                }
            }
            querystring = querystring.concat(theRequest);
        }
        //排序
        querystring = _.sortBy(querystring, 'name');
        //去重
        querystring = _.uniq(querystring, true, 'name');
        var urlData = '';
        for (let i = 0; i < querystring.length; i++) {
            if (querystring[i] && querystring[i].name && querystring[i].value) {
                urlData += querystring[i].name + '=' + querystring[i].value;
                if (i < (querystring.length - 1)) {
                    urlData += '&';
                }
            }
        }
        token = token ? token : getApp().siteInfo.token;
        sign = md5(urlData + token);
        return sign;
    }
}
/**
    二次封装微信wx.request函数、增加交互体全、配置缓存、以及配合微擎格式化返回数据

    @params option 弹出参数表，
    {
        url : 同微信,
        data : 同微信,
        header : 同微信,
        method : 同微信,
        success : 同微信,
        fail : 同微信,
        complete : 同微信,

        cachetime : 缓存周期，在此周期内不重复请求http，默认不缓存
    }
*/
util.request = function (option) {
    var _ = require('underscore.js');
    var md5 = require('md5.js');
    var app = getApp();
    var option = option ? option : {};
    option.cachetime = option.cachetime ? option.cachetime : 0;
    var sessionid = wx.getStorageSync('userInfo').sessionid;
    var url = option.url;
    if (url.indexOf('http://') == -1 && url.indexOf('https://') == -1) {
        url = util.url(url);
    }
    var state = getUrlParam(url, 'state');
    if (!state && !(option.data && option.data.state) && sessionid) {
        url = url + '&state=we7sid-' + sessionid
    }
    var sign = getSign(url, option.data);
    if (sign) {
        url = url + "&sign=" + sign;
    }
    if (!url) {
        return false;
    }

    wx.showNavigationBarLoading();
    if (option.cachetime) {
        var cachekey = md5(url);
        var cachedata = wx.getStorageSync(cachekey);
        var timestamp = Date.parse(new Date());

        if (cachedata && cachedata.data && cachedata.expire > timestamp) {
            if (option.success && typeof option.success == 'function') {
                option.success(cachedata);
            }
            console.log('cache:' + url);
            wx.hideNavigationBarLoading();
            return true;
        }
    }

    wx.request({
      'url': url,
      'data': option.data ? option.data : {},
      'header': option.header ? option.header : {},
      'method': option.method ? option.method : 'GET',
      // 'header': {
      //   'content-type': 'application/x-www-form-urlencoded'
      // },
      'success': function (response) {
        if (option.success && typeof option.success == 'function') {
          if (response.data.errno == '41009') {
            wx.setStorageSync('userInfo', '');
            util.getUserInfo();
          }
          option.success(response);
        }
        //写入缓存，减少HTTP请求，并且如果网络异常可以读取缓存数据
        if (option.cachetime) {
          var cachedata = { 'data': response.data, 'expire': timestamp + option.cachetime * 1000 };
          wx.setStorageSync(cachekey, cachedata);
        }
      },
      'fail': function () {
        if (option.fail && typeof option.fail == 'function') {
          option.fail();
        }
        //如果请求失败，尝试从缓存中读取数据
        var md5 = require('md5.js');
        var cachekey = md5(url);
        var cachedata = wx.getStorageSync(cachekey);
        if (cachedata && cachedata.data) {
          if (option.success && typeof option.success == 'function') {
            option.success(cachedata);
          }
          console.log('failreadcache:' + url);
          wx.hideNavigationBarLoading();
          return true;
        }
      },
      'complete': function () {
        wx.hideNavigationBarLoading();
        if (option.complete && typeof option.complete == 'function') {
          option.complete();
        }
      }
    });
}
/*
* 获取用户信息
*/
util.getUserInfo = function (cb) {
  var app = wx.getStorageSync('userInfo');
  var appcofing = getApp();
  var flag = 0
  // if (app.sessionid) {
  if (flag == 1) {
    typeof cb == "function" && cb(app.sessionid);
  } else {
    //调用登录接口
    var userInfo = {
      'sessionid': '',
      'wxInfo': '',
      'memberInfo': '',
    };

    wx.login({
      success: function (res) { 
      //  app.siteInfo.siteroot + '?i=' + app.siteInfo.uniacid + '&t=' + app.siteInfo.multiid + '&v=' + app.siteInfo.version + '&from=wxapp&';
        var url_openid = appcofing.siteInfo.siteroot + '?c=auth&a=session&do=openid&key=' + appcofing.siteInfo.key + '&secret=' + appcofing.siteInfo.secret;
        util.request({
          url: url_openid,
          data: { code: res.code },
          cachetime: 0,
          success: function (session) {
            if (session.data.errno == 0) { 
              userInfo.sessionid = session.data.data.sessionid
              wx.setStorageSync('userInfo', userInfo);
              wx.getUserInfo({
                success: function (wxInfo) {
                  userInfo.wxInfo = wxInfo.userInfo
                  wx.setStorageSync('userInfo', userInfo);
                  var url_userinfo = appcofing.siteInfo.siteroot + '?c=auth&a=session&do=userinfo&key=' + appcofing.siteInfo.key + '&secret=' + appcofing.siteInfo.secret;
                  util.request({
                    url: url_userinfo,
                    data: {
                      signature: wxInfo.signature,
                      rawData: wxInfo.rawData,
                      iv: wxInfo.iv,
                      encryptedData: wxInfo.encryptedData
                    },
                   method: 'POST',
                    header: {
                       'content-type': 'application/x-www-form-urlencoded'
                     },
                    dataType: 'json',
                    cachetime: 0,
                    success: function (resnew) {
                    //  console.log(resnew.data);
                      console.log(resnew.data.errno);
                      if (resnew.data.errno == 0) {
                        userInfo.memberInfo = resnew.data.data
                        wx.setStorageSync('userInfo', userInfo);
                      } else {
                        console.log('获取用户信息失败')
                      }
                    }
                  })
                },
                fail: function () {
                  console.log('fail')
                },
                complete: function () {
                  typeof cb == "function" && cb(app.userInfo);
                }
              })
            } else {
              console.log('获取openid失败')
            }
          }
        });
      },
      fail: function (e) {
        wx.showModal({
          title: '获取信息失败',
          content: '请允许授权以便为您提供给服务',
          success: function (res) {
            if (res.confirm) {
              util.getUserInfo();
            }
          }
        })
      }
    });
  }
}

util.page = function() {
    const pages = getCurrentPages();
    console.log(pages.length);
    wx.showModal({
        title: '获取信息失败',
        content: `当前页面数${pages.length}`,
        success: function(res) {
            if (res.confirm) {
                util.getUserInfo();
            }
        }
    })
}

util.navigateBack = function(obj) {
    let delta = obj.delta ? obj.delta : 1;
    if (obj.data) {
        let pages = getCurrentPages()
        let curPage = pages[pages.length - (delta + 1)];
        if(curPage.pageForResult) {
            curPage.pageForResult(obj.data);
        } else {
            console.log(obj.data)
            curPage.setData(obj.data);
        }
    }
    wx.navigateBack({
        delta: delta, // 回退前 delta(默认为1) 页面
        success: function (res) {
            // success
            typeof obj.success == "function" && obj.success(res);
        },
        fail: function (err) {
        // fail
            typeof obj.fail == "function" && obj.function(err);
        },
        complete: function () {
            // complete
            typeof obj.complete == "function" && obj.complete();
        }
    })
}
util.checkLogin = function () {
 var app = wx.getStorageSync('userInfo');
 if (!app.sessionid) {
     util.getUserInfo()
 }
 var i = 0;
 while (i <= 100) {
     var app = wx.getStorageSync('userInfo');
     console.log(app.sessionid);
     if (app.sessionid) {
         break;
     } else {
         util.getUserInfo()
     }
     i++;
 }

}
util.formatTime = function (time) {
    if (typeof time !== 'number' || time < 0) {
        return time;
    }
    var hour = parseInt(time / 3600);
    time = time % 3600;
    var minute = parseInt(time / 60);
    time = time % 60;
    var second = time;
    return ([hour, minute, second]).map(function (n) {
        n = n.toString();
        return n[1] ? n : '0' + n;
    }).join(':');
}

util.formatDate = function (date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    return [year, month, day].map(formatNumber).join('-')
}

util.footer = function ($this) {
    var app = getApp();
    var that = $this;
    that.setData({
        tabBar: app.tabBar,
        'tabBar.thisurl': that.__route__
    })
}

util.user = util.getUserInfo;
var formatNumber = function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

// 按分类取商品
util.getGoodsGroup = function(o, c) {
    const a = o.args == undefined || o.args.length == 0 ? '' : '&'+o.args
    const n = o.name == undefined ? '' : o.name

    wx.showLoading({
        title: '加载中'
    })

    util.request({
        url: 'entry/ewei_shopv2/mobile&r=goods.index.get_list'+a,
        method: 'GET',
        header: {
          'Accept': 'application/json'
        },
        success: function (e) {
          var d = e.data.result
          typeof c == "function" && c(d);
          wx.hideLoading()
        },
        fail: function () {
            wx.hideLoading()
        }
    })
}

// 转到搜索页
util.tapSearch = function() {
    wx.navigateTo({
        url: '/pages/default/search/search'
    })
}

// 搜索产品
util.searchPost = function(e, c) {
    var app = getApp()

    if (!e || util.trim(e) == '') return

  util.request({
    url: 'entry/ewei_shopv2/mobile&r=goods.index.query',
    method: 'GET',
    data: {keywords: e},
    header: {
      'Accept': 'application/json'
    },
    success: function(e) {
      var d = e.data.result
      typeof c == 'function' && c(d)
    },
    fail: function() {
      //
    }
  })
}

util.searchReset = function(c) {
    //
}

// 删除空格
util.trim = function(str) {
    return this.isString(str) ? str.trim() : str
}

/**
 * 判断某个元素是否为字符串
 * @param  {String}  value
 * @return {Boolean}
 */
util.isString = function(value) {
    return typeof value === 'string'
}

// 取购物车
util.getCartList = function(c) {
  util.request({
    url: 'entry/ewei_shopv2/mobile&r=member.cart.get_list',
    method: 'GET',
    header: {
      'Accept': 'application/json'
    },
    success: function (e) {
      var d = e.data.result
      typeof c == "function" && c(d)
    }
  })
}

// 确认订单
util.orderCreateMain = function(c) {
  util.request({
    url: 'entry/ewei_shopv2/mobile&r=order.create.get_main',
    method: 'GET',
    header: {
      'Accept': 'application/json'
    },
    success: function(e) {
      typeof c == "function" && c(e.data)
    }
  })
}

// 取收货地址
util.getAddress = function(c) {
  wx.showLoading()

  util.request({
    url: 'entry/ewei_shopv2/mobile&r=member.address.indexapp',
    method: 'GET',
    header: {
      'Accept': 'application/json'
    },
    success: function(e) {
      wx.hideLoading()
      var d = e.data.result
      typeof c == "function" && c(d)
    },
    fial: function() {
      wx.hideLoading()
    }
  })
}

// 编辑或提交用户地址
util.formAddress = function(d, c) {
  wx.showLoading()

  util.request({
    url: 'entry/ewei_shopv2/mobile&r=member.address.submitapp',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: d,
    success: function(e) {
      wx.hideLoading()
      var d = e.data
      typeof c == "function" && c(d)
    },
    fail: function() {
      wx.hideLoading()
    }
  })
}

// 分类列表
util.getCategoryList = function(c) {
  wx.showLoading()

  util.request({
    url: 'entry/ewei_shopv2/mobile&r=shop.category.get_list',
    method: 'GET',
    header: {
      'Accept': 'application/json'
    },
    success: function(e) {
      wx.hideLoading()
      var d = e.data.result
      typeof c == 'function' && c(d)
    },
    fail: function() {
      wx.hideLoading()
    }
  })
}

// 回首页
util.gotoHome = function() {
  wx.switchTab({
    url: '/pages/index/index'
  })
}

util.json2Form = function(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}

util.random = function(e) {
    var Num = ""
    for (var i = 0; i < 6; i++) {
      Num += Math.floor(Math.random() * 10);
    }
    return Num
}

/**
 * 取系统模块
 */
util.initView = function (url, cb) {
  util.request({
    url: url,
    success: function (res) {
      var data = res.data
      if (data.status == 0) {
        wx.showModal({
          title: '提示',
          content: data.result.message,
          showCancel: false
        })
        return
      }

      typeof cb == 'function' && cb(data)
    }
  })
}

/**
 * 解析模块
 */
util.parseModules = function (modules, cb) {
  const counts = modules.length

  if (counts > 0) {
    for (var i = 0; i < counts; i++) {
      // 模块标识
      const id = modules[i].id
      const flag = i

      console.log('Module: '+id)

      // 公告
      if (id == 'notice') {
        // 是否自动读取
        if (modules[i].params.noticedata == 0) {
          util.getNotice(function (res) {
            modules[flag].data = res

            typeof cb == 'function' && cb(modules)
          })
        } else {
          typeof cb == 'function' && cb(modules)
        }
      } else if (id == 'goods') {
        const goodsdata = modules[i].params.goodsdata
        const goodsnum = modules[i].params.goodsnum > 20 ? 20 : modules[i].params.goodsnum
        // 商品组
        if (goodsdata > 0) {
          var data = {
            pagesize: goodsnum
          }

          if (goodsdata == 3) {
            // 新品上市
            data.isnew = 1
          } else if (goodsdata == 4) {
            // 热销
            data.ishot = 1
          } else if (goodsdata == 5) {
            // 推荐商品
            data.isrecommand = 1
          } else if (goodsdata == 6) {
            // 促销
            data.isdiscount = 1
          } else if (goodsdata == 7) {
            // 包邮
            data.issendfree = 1
          } else if (goodsdata == 8) {
            // 限时
            data.istime = 1
          }

          util.getGoodsGroup(data, function(res) {
            modules[flag].data = res
            typeof cb == 'function' && cb(modules)
          })
        } else {
          typeof cb == 'function' && cb(modules)
        }
      } else if (id == 'merchgroup') {
        const merchdata = modules[i].params.merchdata
        if (merchdata > 0) {
          //
        } else {
          typeof cb == 'function' && cb(modules)
        }
      }
    }
  }
}

/**
 * 公告
 */
util.getNotice = function(cb) {
  util.request({
    url: 'entry/ewei_shopv2/mobile&r=shop.notice.get_list',
    method: 'GET',
    header: {
      'Accept': 'application/json'
    },
    success: function (e) {
      var d = e.data.result
      var list = []
      if (d.total > 0) {
        list = d.list
      }

      typeof cb == "function" && cb(list);
    },
    fail: function () { }
  })
}

/**
 * 商品组
 */
util.getGoodsGroup = function(data, cb) {
  util.request({
    url: 'entry/ewei_shopv2/mobile&r=goods.index.get_list',
    method: 'GET',
    data: data,
    header: {
      'Accept': 'application/json'
    },
    success: function(e) {
      var d = e.data.result
      var list = []
      if (d.total > 0) {
        list = d.list
      }

      typeof cb == 'function' && cb(list)
    },
    fail: function() {
      //
    }
  })
}

/**
 * 商品详情
 */
util.getGoodsDetail = function(id, cb) {
  util.request({
    url: 'entry/ewei_shopv2/mobile&r=goods.detailapp.get_detailapp&id=' + id,
    method: 'GET',
    header: {
      'Accept': 'application/json'
    },
    success: function (e) {
      var d = e.data.result

      typeof cb == 'function' && cb(d)
    },
    fail: function () {
      //
    }
  })
}

/**
 * 确认收货
 */
util.finishGoods = function(id, cb) {
  util.getUserInfo(function () {
    util.request({
      url: 'entry/ewei_shopv2/mobile&r=order.op.finish',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: id
      },
      success: function (res) {
        typeof cb == 'function' && cb(res.data)
      },
      fail: function(e) {
        console.log(e)
      }
    })
  })
}

/**
 * 删除 or 恢复订单
 */
util.deleteOrder = function(data, cb) {
  util.getUserInfo(function () {
    util.request({
      url: 'entry/ewei_shopv2/mobile&r=order.op.delete',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: data,
      success: function (res) {
        typeof cb == 'function' && cb(res.data)
      },
      fail: function (e) {
        console.log(e)
      }
    })
  })
}

module.exports = util;