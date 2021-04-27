<template>
  <div :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      chart: null
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
      this.chart = echarts.init(this.$el)

      this.chart.setOption({
        color: ['#3398DB'],
        xAxis: {
          type: 'category',
          data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021'],
          axisLabel: {
            textStyle: {
              color: '#0289BB',
              fontSize: '16'
            }
          },
          // 控制网格线是否显示
          splitLine: {
            show: false,
            lineStyle: {
              // 使用深浅的间隔色
              color: '#0289BB'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#0289BB',
              fontSize: '16'
            }
          },
          splitLine: {
            lineStyle: {
              // 使用深浅的间隔色
              color: '#0289BB'
            }
          }
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true,
          itemStyle: {
            color: '#3CE6CB'
          }
        }]
      })
    }
  }
}
</script>
