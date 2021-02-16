<template>
  <div class="dashboard-container note" :style="note">
    <dv-border-box-12">
      <el-row :gutter="24" style="padding-top: 10px">
        <el-col :span="6">
          <div style="height:300px" class="chart-wrapper">
            <dv-border-box-12 style="margin-left: 10px">
              <dv-charts :option="gradeOption" />
            </dv-border-box-12>
          </div>
          <div style="height:300px" class="chart-wrapper">
            <dv-border-box-12 style="margin-left: 10px">
              <dv-charts :option="gradeOption" />
            </dv-border-box-12>
          </div>
          <div style="height:300px" class="chart-wrapper">
            <dv-border-box-12 style="margin-left: 10px">
              <dv-charts :option="gradeOption" />
            </dv-border-box-12>
          </div>
        </el-col>
        <el-col :span="12">
          <div
            class="bmap-wrapper"
            align="center"
          >
            <map-chart />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="chart-wrapper">
            <dv-border-box-12 style="margin-left: -15px;">
              <grade-chart style="padding-top: 30px" />
            </dv-border-box-12>
          </div>
          <div class="chart-wrapper">
            <dv-border-box-12 style="margin-left: -15px;">
              <grade-chart style="padding-top: 30px" />
            </dv-border-box-12>
          </div>
          <div class="chart-wrapper">
            <dv-border-box-12 style="margin-left: -15px;">
              <grade-chart style="padding-top: 30px" />
            </dv-border-box-12>
          </div>
        </el-col></el-row></dv-border-box-12"></dv-border-box-12></div></el-col>
  </el-row>
  </dv-border-box-12>

  </div>
</template>

<script>
import resize from './components/mixins/resize'
// import 'echarts-gl'
require('echarts/theme/macarons') // echarts theme

import GradeChart from './components/GradeChart'

import MapChart from './components/MapChart'
export default {
  name: 'Index',
  components: {
    GradeChart,
    MapChart
  },
  mixins: [resize],
  data() {
    return {
      gradeOption: '',
      gradeData: '',
      config: '',
      note: {
        backgroundImage: 'url(' + require('../../assets/map_marker/background.jpg') + ') ',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
        // filter: 'blur(10px)'
      }
    }
  },
  computed: {
  },
  mounted() {

  },
  created() {
    this.getGradeData()
    this.showGradePie()
  },
  methods: {
    getGradeData() {
      // this.gradeData
    },
    showGradePie() {
      this.gradeOption = {
        title: {
          text: '树木等级占比饼状图',
          style: {
            fill: '#32c5e9'
          }
        },
        series: [
          {
            type: 'pie',
            data: [
              { name: '国家一级古树', value: 93 },
              { name: '国家二级古树', value: 32 },
              { name: '国家三级古树', value: 65 },
              { name: '名木', value: 44 }
            ],
            insideLabel: {
              show: true,
              style: {
                fontSize: 12,
                fill: '#000',
                textAlign: 'center',
                textBaseline: 'middle'
              }
            },
            outsideLabel: {
              show: true,
              labelLineEndLength: 10
            },
            animationCurve: 'easeOutCubic'

          }
        ]
      }
    }

  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    height: 95.5vh;
    //background-color: #1f2d3d;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}
.chart-wrapper{
  z-index:3;
  position: relative
}
.bmap-wrapper {
  width: 100%;
  height: 40vh;
  margin-top: 16vh;
  margin-left: -17%;
  z-index:1;
  position: relative
}

</style>
