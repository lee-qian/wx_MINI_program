// pages/list/list.js
let datas = require('../../datas/list-data.js') //不能用绝对路径，只能用相对路径
Page({

  //页面的初始数据
  data: {
    listArr: []
  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {
    this.setData({
      listArr: datas.list_data
    })
  },

  //点击跳转到detail详情页
  toDetail(event){
    console.log(event)
    let id = event.currentTarget.dataset.id; //获取点击跳转对应的下标
    wx.navigateTo({  //跳转到相应页面（保留当前页面） 而wx.redirectTo()是跳转后不保留当前页面
      url:'/pages/detail/detail?id='+id,
    })
  },
  //点击轮播图跳转
  carouselToDetail(event){
    let id = event.target.dataset.id;  //target和currentTarget的区别
    wx.navigateTo({  //跳转到相应页面（保留当前页面） 而wx.redirectTo()是跳转后不保留当前页面
      url:'/pages/detail/detail?id='+id,
    })
  }
})