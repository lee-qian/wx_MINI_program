// pages/detail/detail.js
let datas = require('../../datas/list-data.js');
let bgMusic = wx.getBackgroundAudioManager();
let appDatas = getApp();

Page({

  //页面的初始数据
  data: {
    detailObj: {},
    id: null,
    isCollected: false,
    isMusicPlay: false,
  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {
    console.log(options)
    let id = options.id;    //获取参数值
    this.setData({
      detailObj: datas.list_data[id],
      id: id
    })

    //根据本地缓存的数据判断用户是否收藏当前的文章
    let detailStorage = wx.getStorageSync('isCollected');
    if(!detailStorage){  //如果用户第一次收藏，isCollected不一定为对象，所以需要初始化
      //在缓存中初始化空对象
      wx.setStorageSync('isCollected', {})
    }
    if(detailStorage[id]){  //若缓存为true，则动态设置isCollected为true
      this.setData({
        isCollected: true
      })
    }

    //判断音乐是否在播放(防止点击播放后back后再回来不是播放状态，希望保留上一次的状态)
    if(appDatas.globalData.isPlay && appDatas.globalData.pageId===id){
      this.setData({
        isMusicPlay: true
      })
    }
    //监听音乐播放
    bgMusic.onPlay(()=>{
      console.log("音乐播放")
      //修改isMusicPlay状态值
      this.setData({
        isMusicPlay: true
      })
      //修改appDatas中的数据(为了保留上一次离开的状态)
      appDatas.globalData.isPlay = true
      appDatas.globalData.pageId = id
    })

    //监听音乐暂停
    bgMusic.onPause(()=>{
      console.log("音乐暂停");
      //修改isMusicPlay状态值
      this.setData({
        isMusicPlay: false
      })
      appDatas.globalData.isPlay = false
    })
  },

  //处理点击收藏与否
  handleCollection(){
    let isCollected = !this.data.isCollected;
    console.log(isCollected)
    //更新状态
    this.setData({
      isCollected
    })
    //提示用户
    let title = isCollected?"收藏成功":"取消收藏"
    wx.showToast({
      title,
      icon: 'success'
    })
    //缓存数据到本地
    //let obj = {}  不可行，会覆盖之前的状态
    let id = this.data.id  
    wx.getStorage({
      key: 'isCollected',
      success: (datas)=>{
        let obj = datas.data;      
        obj[id] = isCollected;  //设置对应项的状态
        wx.setStorage({
          key: 'isCollected',
          data: obj,
          success: ()=>{
            console.log('缓存成功')
          }
        })
      }
    })
  },
  
  //处理音乐播放
  handleMusicPlay(){
    let {dataUrl, title} = this.data.detailObj.music;
    let isMusicPlay = !this.data.isMusicPlay;
    this.setData({
      isMusicPlay
    });
    
    //控制音乐播放
    if(isMusicPlay){
      //音乐播放
      bgMusic.title = title,
      bgMusic.src = dataUrl
      bgMusic.play()
    }else{
      //音乐暂停
      bgMusic.pause()
    }
  },

  //处理点击分享功能
  handleShare(){
    wx.showActionSheet({
      itemList: ['分享到朋友圈', '分享到QQ', '分享到微博']
    })
  },
})