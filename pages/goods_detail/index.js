import { request } from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime';


// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 页面详情数据
    goodsDeailData: {},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.getGoodsDeail(options.goods_id)
  },



  //获取页面详情数据
  async getGoodsDeail(goods_id) {
    const res = await request({
      url: '/goods/detail',
      data: {
        goods_id
      }
    })
    // request({
    //   url: '/goods/detail',
    //   data: {
    //     goods_id
    //   }
    // }).then(res => {
   

    this.setData({
      goodsDeailData: res
    })
    // })

  },

  // 点击图片放大效果
  handleImage(e) {
    const { pics } = this.data.goodsDeailData
    const urls = pics.map(v => v.pics_mid_url)
    // console.log(e);

    wx.previewImage({
      // 被点击的图片路径
      current: e.currentTarget.dataset.current,
      // 被预览的图片路径数组
      urls: urls

    });

  },

  // 加入购物车
  handleAddCart() {
    // 获取页面数据 
    const { goodsDeailData } = this.data
    // 获取本地存储购物车数据
    let carList = wx.getStorageSync('cart') || [];
    // 判断该商品对象是否存在于数组中
    let index = carList.findIndex(v => v.goods_id === goodsDeailData.goods_id)
    if (index === -1) {
      // 如果没有  则第一次购买
      carList.push({
        goods_id: goodsDeailData.goods_id,
        goods_name: goodsDeailData.goods_name,
        goods_price: goodsDeailData.goods_price,
        goods_small_logo: goodsDeailData.goods_small_logo,
        num: 1
      })


    } else {
      carList[index].num++
      wx.showToast({
        title: '加入购物车成功',
        mask: true,

      });

    }
    // 从新存到本地
    wx.setStorageSync('cart', carList);
  }
})