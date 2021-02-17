<template>
  <div :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
import resize from './mixins/resize'
import { getCityTreeCount } from '@/api/tree'
import '@/utils/china.js'
export default {
  mixins: [resize],
  props: {
    width: {
      type: String,
      default: '140%'
    },
    height: {
      type: String,
      default: '140%'
    }
  },
  data() {
    return {
      chart: null,
      data: ''
    }
  },
  mounted() {
    this.getTreeList()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getTreeList() {
      getCityTreeCount({})
        .then(data => {
          this.data = this.convertData(data)
          this.$nextTick(() => {
            this.initChart()
          })
        }).catch(err => {
          console.log(err)
        })
    },
    convertData(data) {
      const res = []
      for (let i = 0; i < data.length; i++) {
        res.push({
          name: data[i][0],
          value: [data[i][1], data[i][2], data[i][3]]
        })
      }
      return res
    },

    initChart() {
      this.chart = echarts.init(this.$el)

      const option = {
        tooltip: {
          trigger: 'item'
        },
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: '#0D4A81',
              borderColor: '#27ADFC'
            },
            emphasis: {
              areaColor: '#0D4A81'
            }
          }
        },
        series: [{
          name: 'item',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: this.data,
          // symbolSize: function(val) {
          //   return val[2] / 2
          // },
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: '#84fab0'
            }
          }
        }
        ]
      }
      this.chart.setOption(option)
    }
  }
}
</script>
