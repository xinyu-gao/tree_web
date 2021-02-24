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
        series: [
          {
            name: '分布特点',
            center: ['50%', '36%'],
            type: 'pie',
            radius: '50%',
            data: [
              { name: '散生', value: 143, itemStyle: { color: '#84fab0' }},
              { name: '群状', value: 232, itemStyle: { color: '#209FDF' }}
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
              fontSize: '12px',
              color: '#fff',
              formatter: data => {
                return data.name + '\n' + Math.round(data.percent) + '%'
              },
              lineHeight: 20
            },
            labelLine: {
              length: 7,
              length2: 7
            }
          }
        ]
      })
    }
  }
}
</script>
