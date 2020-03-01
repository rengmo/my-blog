Component({
  properties: {
    state: Number
  },
  data: {
    description: [],
    steps: [],
    stepsNames: ['测试测试测试1', '2', '3']
  },
  lifetimes: {
    attached: function () {
      this.diffStateData()
    }
  },
  methods: {
    getStepType: function (index, stepsData) {
      let lastIndex = stepsData.length - 1
      switch (true) {
        case index === 0:
          return 0
        case index === lastIndex:
          return 2
        default:
          return 1
      }
    },
    initStepsData: function (stepsData, stateArr) {
      let arr = stepsData.map((item, index) => {
        let type = this.getStepType(index, stepsData)
        return {
          type,
          state: stateArr[index],
          text: item
        }
      })
      this.setData({
        steps: arr
      })
    },
    initDescriptionData: function (description, hideArr) {
      let descArr = description.map((item, index) => {
        return {
          hide: hideArr[index],
          text: item
        }
      })
      this.setData({
        description: descArr
      })
    },
    // 根据不同的状态使用不同的数据,目前假设有三个步骤
    diffStateData: function () {
      let stepsData = [1, 2, 3]
      let description = ['过程1内容比较长的时候呢过程1内容比较长的时候呢', '过程2']
      let state = this.properties.state
      let stateArr, 
          hideArr
      switch (state) {
        case 0: 
          stateArr = [0, 0, 0]
          hideArr = [true, true]
          break
        case 1: 
          stateArr = [2, 0, 0]
          hideArr = [false, true]
          break
        case 2:
          stateArr = [2, 2, 0]
          hideArr = [false, false]
          break
        case 3:
          stateArr = [2, 2, 2]
          hideArr = [false, false]
          break
      }
      this.initStepsData(stepsData, stateArr)
      this.initDescriptionData(description, hideArr)
    }
  }
})