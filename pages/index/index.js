// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    msg: '',
    userInfo: {},
    isShow: true,
  },
  handleClick(){
    //点击跳转到对应页面
    wx.switchTab({  //不能使用wx.navigateTo
       url: '/pages/list/list'
    })
  },

  //做一些初始化工作，发送请求，开启定时器等
  onLoad() {
    console.log("页面加载")
    this.getUserProfile()
  },
  
  getUserProfile(e) {
    //查看是否授权
    wx.getSetting({
      success:(res)=>{
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接使用wx.getUserProfile获取用户信息
          console.log("用户已经授权")
          wx.getUserInfo({
            success: (res)=>{
              this.setData({
                userInfo: res.userInfo,
                isShow: false
              })
              console.log(res.userInfo)
            }
          })
        }else{
          //用户没有授权
          console.log("用户没有授权")
          this.setData({
            isShow: true
          })
        }
      }
    })
  },

  handleGetUserInfo(res){
    //判断用户点击的是否是允许
    if(res.detail.rawData){
      //允许
      this.getUserProfile()
    }
  }
})
