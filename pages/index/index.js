// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据
    swiperData: [],
    //  导航栏数据
    tapData: [],
    // 楼层数据
      floorData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // console.log(this)
    this.getSwiperdata()
    this.getTap()
    this.getFloor()
  },

  // 获取轮播图数据
  getSwiperdata() {
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',

      success: (res) => {
        // console.log(res.data.message)
        this.setData({
          swiperData: res.data.message
        })
      },

    });
  },
  // 获取导航栏
  getTap() {
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
      success: (res) => {
        // console.log(res)
        this.setData({
          tapData: res.data.message
        })
      }
    })
  },
  // 获取楼层图片
  getFloor() {
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
      success: (res) => {
        // console.log(res)
        this.setData({
          floorData:res.data.message
        })
      }
    })
  }

})