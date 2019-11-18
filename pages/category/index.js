import { request } from '../../request/index.js'

// pages/category/index.js
Page({


  data: {
    // 左侧数据
    menuData: [],
    // 右侧数据
    goodsData: [],
    // 当前索引
    currentIndex: 0,
    // 竖滑动位置
    scrollTop:0
  },


  // 获取的数据
  getdata: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.cacheData()
  },

  // 获取缓存数据和接口数据
  cacheData() {
    // 获取本地存储的数据
    const localCate = wx.getStorageSync('cates');
    // 判断是否存在该数据
    if (localCate) {
      // 判断是否过期
      if (Date.now() - localCate.time > 1000 * 60) {
        // 过期  就重新发请求
        this.getCategoryData()
      } else {
        this.getdata = localCate.data
        this.setData({
          menuData: this.getdata.map(v => {
            return v.cat_name
          }),
          goodsData: this.getdata[0].children

        })
      }
    } else {
      this.getCategoryData()
    }
  },

  // 获取分类数据
  getCategoryData() {
    request({
      url: '/categories'
    }).then(res => {
      //  console.log(res)
      this.getdata = res.data.message
      // 缓存数据
      wx.setStorageSync('cates', {
        data: this.getdata,
        // 时间
        time: Date.now()
      });

      this.setData({
        menuData: this.getdata.map(v => {
          return v.cat_name
        }),
        goodsData: this.getdata[0].children

      })
    })
  },

  //点击菜单显示数据
  handleMenu(e) {
    const { index } = e.target.dataset;
    this.setData({
      scrollTop:0,
      currentIndex: index,
      goodsData: this.getdata[index].children
    })
  }

})