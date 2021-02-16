<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
import resize from './mixins/resize'
import { getTreeListAll } from '@/api/tree'
import china from '@/utils/china.js'
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '130%'
    },
    height: {
      type: String,
      default: '140%'
    }
  },
  data() {
    return {
      chart: null,
      listData: ''
    }
  },
  mounted() {
    this.getTreeList()
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
    getTreeList() {
      getTreeListAll()
        .then(data => {
          this.listData = data
        }).catch(err => {
          console.log(err)
        })
    },
    convertData(data) {
      console.log(data)
      const res = []
      for (let i = 0; i < data.length; i++) {
        res.push({
          name: data[i].chineseName,
          value: [data[i].longitude, data[i].latitude, 1]
        })
      }
      return res
    },

    initChart() {
      this.chart = echarts.init(this.$el, 'ss')

      const option = {
        // backgroundColor: '#1f2d3d',
        title: {
          text: '全国城市古树名木分布',
          left: 'center',
          textStyle: {
            color: '#32C5E9'
          }
        },
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
          roam: true,
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
          name: 'pm2.5',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: this.convertData(this.listData),
          symbolSize: function(val) {
            return val[2] / 10
          },
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
              color: '#ddb926'
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
