<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { getLineDataByIMSI } from '@/api/imsi'
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
      const currentNode = 12145213
      getLineDataByIMSI({ 'imsi': currentNode })
        .then(data => {
          console.log(data)
          this.setOptions(data)
        })
    },
    setOptions(data) {
      const lineTime = data.lineTimeList
      const tempData = data.lineTempList
      const humidityData = data.lineHumidityList
      const slantData = data.lineSlantList
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
        yAxis: [
          {
            type: 'value',
            name: '环境温度',
            min: 0,
            max: 100,
            position: 'left',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#FF005A'
              }
            },
            axisLabel: {
              formatter: '{value}  °C'
            },
            axisTick: {
              show: false
            }
          },
          {
            type: 'value',
            name: '相对湿度',
            min: 0,
            max: 100,
            position: 'left',
            offset: 60,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#8fd3f4'
              }
            },
            axisLabel: {
              formatter: '{value} %'
            },
            axisTick: {
              show: false
            }
          },
          {
            type: 'value',
            name: '倾斜度',
            min: 0,
            max: 90,
            position: 'right',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#d57eeb'
              }
            },
            axisLabel: {
              formatter: '{value} °'
            },
            axisTick: {
              show: false
            }
          }
        ],
        legend: {
          data: ['环境温度', '相对湿度', '倾斜度']
        },
        series: [{
          name: '环境温度',
          itemStyle: {
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
          data: tempData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '相对湿度',
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
          data: humidityData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        },
        {
          name: '倾斜度',
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
          data: slantData,
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
