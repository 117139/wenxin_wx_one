// pages/index1/canvas/canvas.js
Page({
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  onReady: function (e) {
    // // 使用 wx.createContext 获取绘图上下文 context
    // var context = wx.createCanvasContext('firstCanvas')

    // context.setStrokeStyle("#00ff00")//设置线条样式
    // context.setLineWidth(5)//设置或返回当前线条的宽度
    // context.rect(0, 0, 300, 200)
    // //为当前路径添加一条矩形子路径。(x, y, width, height)x, y为左上坐标，width, height为矩形的大小。
    // context.stroke()//绘制出定义的路径
    // context.setStrokeStyle("#ff0000")
    // context.setLineWidth(2)
    // context.moveTo(160, 100)//把路径移动到画布中的指定点，不创建线条
    // context.arc(100, 100, 60, 0, 2 * Math.PI, true)//创建弧/曲线（用于创建圆形或部分圆）
    // //arc(x,y,r,sAngle,eAngle,counterclockwise)
    // //xy-圆中心坐标，
    // //sAngle-起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）。
    // //eAngle-结束角，以弧度计。
    // //counterclockwise-可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。
    // context.moveTo(140, 100)
    // context.arc(100, 100, 40, 0, Math.PI, false)
    // context.moveTo(85, 80)
    // context.arc(80, 80, 5, 0, 2 * Math.PI, true)
    // context.moveTo(125, 80)
    // context.arc(120, 80, 5, 0, 2 * Math.PI, true)
    // context.stroke()
    // context.draw()
    this.draw()
    setInterval(this.draw,100)
  },
  position:{
    x: 0,
    y:0
  },
  draw:function(){
    var context = wx.createCanvasContext('firstCanvas')
    this.position.x++;
    this.position.y++;
    if (this.position.x>=100){
      // return
    }
    // context.setStrokeStyle("#00ff00")//设置线条样式
    // context.setLineWidth(5)//设置或返回当前线条的宽度
    // context.rect(0, 0, 300, 200)
    // //为当前路径添加一条矩形子路径。(x, y, width, height)x, y为左上坐标，width, height为矩形的大小。
    // context.stroke()//绘制出定义的路径
    context.setStrokeStyle("#ff0000")
    context.setLineWidth(2)
    // context.moveTo(160, 100)//把路径移动到画布中的指定点，不创建线条
    context.arc(this.position.x, this.position.y, 60, 0, 2 * Math.PI, true)//创建弧/曲线（用于创建圆形或部分圆）
    //arc(x,y,r,sAngle,eAngle,counterclockwise)
    //xy-圆中心坐标，
    //sAngle-起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）。
    //eAngle-结束角，以弧度计。
    //counterclockwise-可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。
    // context.moveTo(140, 100)
    // context.arc(100, 100, 40, 0, Math.PI, false)
    // context.moveTo(85, 80)
    // context.arc(80, 80, 5, 0, 2 * Math.PI, true)
    // context.moveTo(125, 80)
    // context.arc(120, 80, 5, 0, 2 * Math.PI, true)
    context.stroke()
    context.draw()
  }
})