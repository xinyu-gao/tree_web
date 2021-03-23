<template>
  <div>
    <div :class="className" :style="{height:height,width:width}" />
    <div class="font:12px Extra Small"> 更新时间：{{ sendTime }}</div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons')
import resize from '../components/mixins/resize'
import { getNodeDefectInfoByIMSI } from '@/api/imsi'
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
  created() {
    this.getData()
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el.firstElementChild, 'macarons')
      this.getData()
    },
    getData() {
      const imsi = 12145213
      getNodeDefectInfoByIMSI({ imsi: imsi })
        .then(data => {
          this.handleData(data.data)
          this.sendTime = handleTime(data.sendTime)
        }).catch(err => {
          console.log(err)
        })
    },
    handleData(data) {
      const xData = []
      const yData = []
      for (let i = 0; i < 100; i++) {
        xData.push(i)
        yData.push(i)
      }
      const data_new = []
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          data_new.push([j, 100 - i, data[i][j]])
        }
      }

      console.log(data_new)
      this.setOptions(xData, yData, data_new)
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
          left: '5%',
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
</style>
