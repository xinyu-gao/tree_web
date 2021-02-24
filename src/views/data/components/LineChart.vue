<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { getLineDataByIMSI } from '@/api/nodeInfo'
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
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  computed: {
    // lineTime: function() {
    //   return this.$store.getters.lineTime
    // }
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
    this.getLineData()
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.getLineData()
    },
    getLineData() {
      const currentNode = this.$store.getters.currentNode
      getLineDataByIMSI(currentNode)
        .then(data => {
          console.log(data)
          this.setOptions(data)
        })
    },
    setOptions(data) {
      const lineTime = data.lineTimeList
      const mcuTempData = data.lineMcuTempList
      const envTempData = data.lineEnvTempList
      const brightData = data.lineBrightList
      const smogData = data.lineSmogList
      this.chart.setOption({
        xAxis: {
          data: lineTime,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
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
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['芯片温度', '环境温度', '光线强度', '烟雾浓度']
        },
        series: [{
          name: '芯片温度', itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: mcuTempData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '环境温度',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#d57eeb',
              lineStyle: {
                color: '#d57eeb',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: envTempData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        },
        {
          name: '光线强度',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#8fd3f4',
              lineStyle: {
                color: '#8fd3f4',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: brightData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        },
        {
          name: '烟雾浓度',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#40c9c6',
              lineStyle: {
                color: '#40c9c6',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: smogData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }
        ]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
