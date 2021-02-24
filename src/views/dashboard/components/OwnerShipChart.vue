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
      default: '50%'
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
        title: {
          text: '树木权属',
          textStyle: {
            color: '#27ADFC'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function(params) {
            const tar = params[1]
            return tar.name + '<br/>' + tar.value + ' 棵'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true

        },
        xAxis: {
          type: 'category',
          splitLine: { show: false },
          data: ['总数', '国有', '集体', '个人', '其他']
        },
        yAxis: {
          type: 'value',
          splitLine: { show: false }
        },
        series: [
          {
            name: '辅助',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              barBorderColor: 'rgba(0,0,0,0)',
              color: 'rgba(0,0,0,0)'
            },
            emphasis: {
              itemStyle: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
              }
            },
            data: [0, 1400, 1200, 900, 0]
          },
          {
            name: '数量',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'inside'
            },
            itemStyle: {
              color: '#3CE6CB'
            },
            data: [{ name: '总数', value: 2600, itemStyle: { color: '#37A2DA' }}, 1200, 300, 200, 900]
          }
        ]
      })
    }
  }
}
</script>
