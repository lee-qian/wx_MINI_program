// pages/movies/movies.js
const MOVIE_URL = 'http://t.yushu.im/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b';
let appDatas = getApp();

Page({

  //页面的初始数据
  data: {
    moviesArr:[]
  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {
    wx.request({
      url: MOVIE_URL,
      sucess: (res)=>{
        更新状态值
        this.setData({
          moviesArr:data.subjects
        }) 
        appDatas.globalData.moviesArr = moviesArr   //将数据存入到appDatas中
      }
    })
  }
})