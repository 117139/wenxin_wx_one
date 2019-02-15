// pages/index1/form/form.js
Page({
  data:{
    form_info: ''
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
   this.setData({
     form_info: ''
   })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
})