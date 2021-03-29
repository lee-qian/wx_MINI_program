// pages/movieDetail/movieDetail.js
let appDatas = getApp();  //去除数据

Page({

  //页面的初始数据
  data: {
    movieDetail: {}
  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {
    console.log(options);
    this.setData({
      movieDetail: appDatas.globalData.moviesArr(option.index)
    })
  }
})