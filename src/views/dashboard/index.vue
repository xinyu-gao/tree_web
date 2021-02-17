<template>
  <dv-border-box-6 class="dashboard-container note" :style="note">
    <dv-border-box-7 :color="['#0D4A81', '#209FDF']">
      <el-row :gutter="24" style="padding-top: 10px">
        <el-col :span="6">
          <dv-decoration-8 style="width:100%;height:4vh;" :color="['#0D4A81', '#209FDF']" />
          <dv-border-box-6 style="margin-top:5vh;height:20vh" :color="['#0D4A81', '#209FDF']">
            <!--            <statistic-count />-->
            <info-text />
          </dv-border-box-6>
          <div style="margin-top:5vh;height:20vh" />
          <div style="margin-top:5vh;height:10vh" />
          <div style="margin-top:5vh; margin-left: 2vh">
            <city-chart style="height:20vh" />
          </div>
        </el-col>
        <el-col :span="12">

          <div class="bmap-wrapper" align="center">
            <map-chart />
          </div>
        </el-col>
        <el-col :span="6">
          <dv-decoration-8 :reverse="true" style="width:100%;height:4vh;" :color="['#0D4A81', '#209FDF']" />
          <time-text style="height:5vh;margin-right:3px" />
          <div style="margin-top: 1vh">
            <grade-chart style="height: 20vh" />
          </div>
          <div style="margin-top: 5vh">
            <grade-chart style="margin-top: 5vh;height: 20vh" />
          </div>
          <div style="margin-top:5vh;height:10vh" />
          <special-chart class="specialChart" />
        </el-col>
      </el-row>
    </dv-border-box-7>
    </div>
  </dv-border-box-6></template>

<script>
import resize from './components/mixins/resize'
import GradeChart from './components/GradeChart'
import SpecialChart from './components/SpecialChart'
import MapChart from './components/MapChart'
import CityChart from './components/CityChart'
import StatisticCount from './components/StatisticCount'
import TimeText from './components/TimeText'
import InfoText from './components/InfoText'
export default {
  name: 'Index',
  components: {
    GradeChart,
    MapChart,
    SpecialChart,
    CityChart,
    StatisticCount,
    TimeText,
    InfoText
  },
  mixins: [resize],
  data() {
    return {
      note: {
        backgroundImage: 'url(' + require('../../assets/map_marker/background.jpg') + ') ',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }
    }
  },
  computed: {
  },
  mounted() {

  },
  created() {
  },
  methods: {
  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    height: 95.5vh;
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
}
.bmap-wrapper {
  width: 100%;
  height: 50vh;
  margin-top:8vh;
  margin-left: -20%;
}
.specialChart{
  margin-top:1vh;
  height: 20vh;
  margin-right:3vh;
}
</style>
