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
      default: '110%'
    },
    height: {
      type: String,
      default: '110%'
    }
  },
  data() {
    return {
      chart: null,
      urbanCount: 145,
      ruralCount: 231
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
      this.setOption()
    },
    setOption() {
      this.chart.setOption({
        series: [
          {
            name: '生长场所',
            center: ['50%', '46%'],
            type: 'pie',
            radius: '75%',
            data: [
              { name: '乡村', value: this.ruralCount, itemStyle: { color: '#67E0E3' }},
              { name: '城区', value: this.urbanCount, itemStyle: { color: '#48ABD5' }}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              position: 'outside',
              color: '#fff',
              textStyle: {
                fontSize: 12
              },
              formatter: data => {
                return data.name + '\n' + Math.round(data.percent) + '%'
              },
              lineHeight: 30
            },
            labelLine: {
              length: 15,
              length2: 15
            }
          }
        ]
      })
    }

  }
}
</script>

<style scoped>
.title{
  font: 18px large;
  color: #27ADFC;
  margin: 8px
}
</style>
