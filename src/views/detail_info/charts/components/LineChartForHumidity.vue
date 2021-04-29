<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '../components/mixins/resize'
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '200px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: [Array, Object],
      default: null
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      handler(newValue, oldValue) {
        this.setOptions(newValue)
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
      this.chart = echarts.init(this.$el, 'macarons')
      if (this.chartData && this.chartData.lineTime) {
        this.setOptions(this.chartData)
      }
    },
    setOptions(data) {
      const lineTime = data.lineTimeList
      const humidityData = data.lineHumidityList
      this.chart.setOption({
        xAxis: {
          data: lineTime,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 50,
          right: 30,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: [
          {
            type: 'value',
            name: '相对湿度',
            position: 'left',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#d57eeb'
              }
            },
            axisLabel: {
              formatter: '{value} %'
            },
            axisTick: {
              show: false
            }
          }
        ],
        legend: {
          data: ['相对湿度']
        },
        series: [{
          name: '相对湿度',
          itemStyle: {
            normal: {
              color: '#d57eeb',
              lineStyle: {
                color: '#d57eeb',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: humidityData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }

        ]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
