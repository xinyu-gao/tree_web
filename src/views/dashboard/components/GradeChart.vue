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
      default: '200px'
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
      this.chart = echarts.init(this.$el, 'ss')

      this.chart.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          right: '10%',
          top: '14%',
          padding: [7, 10],
          textStyle: {
            color: '#32c5e9'
          }
        },
        series: [
          {
            name: '古树名木等级',
            center: ['30%', '40%'],
            type: 'pie',
            radius: '70%',
            data: [
              { name: '国家一级古树', value: 93, itemStyle: { color: '#37A2DA' }},
              { name: '国家二级古树', value: 32, itemStyle: { color: '#32C5E9' }},
              { name: '国家三级古树', value: 65, itemStyle: { color: '#67E0E3' }},
              { name: '名木', value: 44, itemStyle: { color: '#9FE6B8' }}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              position: 'inside',
              formatter: data => {
                return Math.round(data.percent) + '%'
              }
            }
          }
        ]
      })
    }
  }
}
</script>
