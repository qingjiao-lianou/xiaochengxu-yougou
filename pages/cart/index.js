// pages/cart/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import { openSetting, chooseAddress, getSetting, showModal, showToast } from '../../request/index.js'


Page({


  data: {
    // 地址信息
    addRess: {},
    // 商品详情信息
    cart: [],
    // 全选
    allChecked: false,
    // 总价
    totalPrice: 0,
    // 结算
    totalNum: 0,
  },


  // onShow  监听页面显示
  onShow() {
    // 获取缓存中的信息
    const address = wx.getStorageSync('address');//地址信息
    const cart = wx.getStorageSync('cart')
    this.setData({
      addRess: address,
      cart
    })
    this.countData(cart)
  },


  handleGet() {
    this.getShippingAddress()

  },

  //  获取收货地址
  async getShippingAddress() {
    try {
      // 获取用户授权状态
      const res1 = await getSetting()
      const auth = res1.authSetting["scope.address"]
      // 判断  如果点击取消
      if (auth === false) {
        // 诱导用户打开授权界面
        await openSetting()
      }
      // 获取用户地址
      const res3 = await chooseAddress()
      res3.chooseddress = res3.provinceName + res3.cityName + res3.countyName + res3.detailInfo
      // 存储起来
      wx.setStorageSync('address', res3);

      this.setData({
        addRess: res3
      })
    } catch (error) {
      console.log(error);

    }







  },

  // 计算数据
  countData(cart) {
    let allChecked = true  // 复选框（全选）
    let totalPrice = 0  //总价
    let totalNum = 0  //结算
    // 

    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.goods_price * v.num
        totalNum += v.num
      } else {
        allChecked = false
      }
    })

    allChecked = cart.length === 0 ? false : allChecked
    this.setData({
      allChecked, totalPrice, totalNum
    })


  },

  // 商品单选功能
  handleChange(e) {

    const { index } = e.target.dataset
    let { cart } = this.data
    // 获取状态取反
    cart[index].checked = !cart[index].checked
    this.setData({
      cart
    })
    // 重新存入本地
    wx.setStorageSync('cart', cart);
    //  计算数据
    this.countData(cart)
  },

  //  商品数量的改变
  async handlenum(e) {
    const { operation, index } = e.target.dataset
    let { cart } = this.data

    if (operation === -1 && cart[index].num === 1) {

      const res = await showModal({
        title: '警告',
        content: '你确定要删除吗',
      })

      if (res) {
        // 删除商品
        cart.splice(index, 1)
      } else {
        return
      }

    } else {
      cart[index].num += operation
    }


    this.setData({
      cart
    })
    // 重新存入本地
    wx.setStorageSync('cart', cart);
    //  计算数据
    this.countData(cart)
  },

  // 结算
  async handleOrderPay() {
    const { totalNum, addRess } = this.data
    if (totalNum === 0) {
      await showToast({ title: "您还没有选购商品哦" })
      return
    }
    if (addRess === '') {
      await showToast({ title: "请选择收货地址" })
      return
    }
    // 跳转

    wx.navigateTo({
      url: '/pages/pay/index'
    })


  }
})