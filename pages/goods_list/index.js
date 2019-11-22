// pages/goods_list/index.js

import { request } from '../../request/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsTap: [
      { id: 0, text: '综合' },
      { id: 1, text: '销量' },
      { id: 2, text: '价格' }
    ],
    //  当前索引
    currentIndex: 0,
    // 商品数据
    goodsList: [],
    // 底线
    isNoLine: false
  },

  // 全局参数对象
  itemListSearch: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  sumTotal: '',



  binditemChange(e) {
    // console.log(e)
    this.setData({
      currentIndex: e.detail.index
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    //  console.log(option);
    const { cid } = option
    this.itemListSearch.cid = cid
    //  console.log(this.itemListSearch);
    this.getItemListSearch()

  },

  // 获取列表数据
  getItemListSearch() {
    request({
      url: '/goods/search',
      data: this.itemListSearch
    }).then(res => {
      // console.log(res);
      const oldList = this.data.goodsList
      const { goods } = res.data.message
      const newList = goods
      this.sumTotal = Math.ceil(res.data.message.total / this.itemListSearch.pagesize)
      // console.log(this.sumTotal);

      this.setData({
        goodsList: [...oldList, ...newList]
      })

      // 请求完毕后关闭刷新窗口
      wx.stopPullDownRefresh()
    })

  },

  // 页面上拉触底事件的处理函数
  onReachBottom() {
    if (this.itemListSearch.pagenum >= this.sumTotal) {
      wx.showToast({
        title: '没有了',
        icon: 'none',
        duration: 2000
      });
      this.setData({
        isNoLine: true

      })
      // console.log(this.data.isNoLine);

    } else {
      // 获取下一页数据
      this.itemListSearch.pagenum++
      this.getItemListSearch()
    }

  },


  // 下拉刷新页面
  onPullDownRefresh() {
    // console.log('haha');
    this.itemListSearch.pagenum = 1,
      this.setData({
        goodsList: []
      }),
      this.getItemListSearch()

  }


})