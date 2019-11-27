// pages/cart/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';
// import { openSetting, chooseAddress, getSetting, showModal, showToast } from '../../request/index.js'


Page({


  data: {
    // 地址信息
    addRess: {},
    // 商品详情信息
    cart: [],
    // 总价
    totalPrice: 0,
    // 结算
    totalNum: 0,
  },


  // onShow  监听页面显示
  onShow() {
    // 获取缓存中的信息
    const address = wx.getStorageSync('address');//地址信息
    let cart = wx.getStorageSync('cart')
    cart = cart.filter(v => v.checked)
    this.setData({
      addRess: address,
      cart
    })
    this.countData(cart)
  },
  // 计算数据
  countData(cart) {
    let totalPrice = 0  //总价
    let totalNum = 0  //结算
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.goods_price * v.num
        totalNum += v.num
      }
    })
    this.setData({
      totalPrice, totalNum
    })


  },

  // 支付
  handlePay() {
    wx.navigateTo({
      url: '/pages/auth/index',
    });
      
  }
})