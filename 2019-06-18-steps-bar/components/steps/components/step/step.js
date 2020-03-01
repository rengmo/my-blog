Component({
  properties: {
    /**
     * type有三个值
     * 0 表示是第一个步骤（只有右边的线）
     * 1 表示是中间步骤（有左右两边的线）
     * 2 表示是最后一个步骤（只有左边的步骤）
     */
    type: {
      type: Number,
      value: 1
    },
    /**
     * state有三个值
     * 0 表示左右的线都为灰色
     * 1 表示左边的线为完成态的颜色，右边的线为灰色
     * 2 表示左边的线和右边的线都为完成态的颜色
     */
    state: {
      type: Number,
      value: 0    
    },
    stepText: {
      type: String,
      value: '1'
    }
  },
  data: {
    stateClass: ''
  },
  lifetimes: {
    attached: function () {
      let state = this.properties.state
      let stateClass
      switch (true) {
        case state === 1: 
          stateClass = 'state1'
          break
        case state === 2:
          stateClass = 'state2'
          break
        default:
          stateClass = ''
      }
      this.setData({
        stateClass
      })
    }
  }
})