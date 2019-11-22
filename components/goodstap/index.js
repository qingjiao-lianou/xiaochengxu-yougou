// components/goodstap/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodsTap: {
      type: Array,
      value: []
    },
    currentIndex: {
      type: Number,
      value: 0
    },
    goodsList:{
      type: Array,
      value: []
    }

  },


  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleitem(e) {
      // console.log(e)
      const { index } = e.target.dataset
      this.triggerEvent('itemChange', { index })
    }
  }
})
