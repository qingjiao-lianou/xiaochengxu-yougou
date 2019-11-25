// pages/cart/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import { openSetting, chooseAddress, getSetting } from '../../request/index.js'


Page({


  data: {

  },


  handleGet() {
    this.getShippingAddress()

  },

  //  获取收货地址
  async getShippingAddress() {
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
    console.log(res3);




  }

})