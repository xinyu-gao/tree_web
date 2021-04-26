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
      default: '100%'
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
          triggerOn: 'click',
          enterable: true,
          axisPointer: {
            type: 'shadow'
          },
          formatter: function(params) {
            return `<div style="width: 80px">
                        ${params.name}
                     <div style="margin-top: 2px">数量：  ${params.value[2]}</div>
                     <div style="margin-top: 2px"><a style="color:#9acc99" href="/#/tree_map/tree_map?city=${params.name}">查看地图</a></div>
                     </div>
                    `
          },
          padding: 1
        },
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          zoom: 1.25,
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
          label: {
            normal: {
              position: 'right',
              show: false,
              formatter: function(params) {
                return params.name
              }
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: '#84fab0'
            }
          },
          tooltip: {}
        }
        ]
      }
      this.chart.setOption(option)
    }
  }
}
</script>
