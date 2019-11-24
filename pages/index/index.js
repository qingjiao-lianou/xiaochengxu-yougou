// pages/index/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from '../../request/index.js'



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
    floorData: []
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
  async getSwiperdata() {
    const res = await request({
      url: '/home/swiperdata'
    })
    // console.log(res);
    
    // request({
    //   url: '/home/swiperdata'
    // }).then(res => {
    this.setData({
      swiperData: res
    })
    // })
  },
  // 获取导航栏
  async getTap() {
    const res = await request({
      url: '/home/catitems'
    })
    this.setData({
      tapData: res
    })

  },
  // 获取楼层图片
  async getFloor() {
    const res = await
      request({
        url: '/home/floordata'
      })
    this.setData({
      floorData: res
    })


  }

})