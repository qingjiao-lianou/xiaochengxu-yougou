// pages/search/index.js

import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from '../../request/index.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    isShow: false,
    valueIup: ''
  },

  setTime: -1,
  // 绑定输入框事件  获取关键字
  handleInput(e) {
    const { value } = e.detail
    if (value.trim()) {
      this.setData({
        isShow: true
      })
      clearTimeout(this.setTime)
      this.setTime = setTimeout(() => {
        this.getQuery(value)
      }, 1000)
    }

  },

  // 获取搜索内容
  async getQuery(value) {
    const res = await request({ url: '/goods/qsearch', data: { query: value } })
    this.setData({
      list: res
    })

  },

  handleBtn() {
    this.setData({
      list: [],
      isShow: false,
      valueIup: ''
    })

  }
})