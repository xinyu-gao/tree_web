<template>
  <div>
    <div :class="className" :style="{height:height,width:width}" />
    <div class="text" :style="{marginTop:textMarginTop,marginLeft:textMarginLeft}"> <strong>更新时间： </strong>{{ sendTime }}</div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons')
import resize from '../components/mixins/resize'
import { handleTime } from '@/utils/commonUtil'
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '460px'
    },
    height: {
      type: String,
      default: '400px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    textMarginTop: {
      type: String,
      default: '0px'
    },
    textMarginLeft: {
      type: String,
      default: '0px'
    },
    defectData: {
      type: [String, Object],
      default() {
        return {}
      }
    }

  },
  data() {
    return {
      chart: null,
      sendTime: ''

    }
  },
  computed: {
  },
  watch: {
    defectData: {
      handler(newValue, oldValue) {
        this.handleData(newValue)
      },
      deep: true
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el.firstElementChild, 'macarons')
      this.handleData(this.defectData)
    },

    handleData(data) {
      this.sendTime = handleTime(data.sendTime)
      data = data.data
      const xData = []
      const yData = []
      for (let i = 0; i < 100; i++) {
        xData.push(i)
        yData.push(i)
      }
      const data_new = []
      if (data) {
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].length; j++) {
            data_new.push([j, 100 - i, data[i][j]])
          }
        }

        this.setOptions(xData, yData, data_new)
      }
    },
    setOptions(xData, yData, data) {
      this.chart.setOption({
        tooltip: {},
        xAxis: {
          type: 'category',
          data: xData
        },
        yAxis: {
          type: 'category',
          data: yData
        },
        visualMap: {
          min: 0,
          max: 1.0,
          type: 'continuous',
          calculable: true,
          realtime: false,
          itemHeight: 300,
          inRange: {
            color: [
              '#FF0000', '#FF0000', '#FCE800', '#FBFC00',
              '#A3FE01', '#46FE00', '#46FE00',
              '#46FE00', '#FFFFFF']
          },
          right: '-7',
          top: '15 %'
        },
        series: [{
          name: 'Defect',
          type: 'heatmap',
          data: data,
          itemStyle: {
            emphasis: {
              borderColor: '#333',
              borderWidth: 1
            }
          },
          progressive: 0,
          animation: false
        }],
        grid: [{
          left: '6%',
          bottom: '7%',
          top: '10%',
          right: '15%'
        }]

      })
    }

  }
}
</script>
<style lang="scss" scoped>
.text{
  font-size: 14px;
}
</style>
