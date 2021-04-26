<template>
  <div id="dashboard" class="dashboard-container">
    <dv-border-box-4 :color="['#0D4A81', '#209FDF']">
      <el-row :gutter="24" style="padding-top: 10px; margin-left: 0.5vh">
        <el-col :span="6">
          <svg-icon
            icon-class="fullscreen"
            style="margin-top:2vh;margin-left: 20px"
            @click="click"
          />
          <dv-border-box-6 style="margin-top:2vh" :color="['#0D4A81', '#209FDF']">
            <info-text />
          </dv-border-box-6>

          <dv-border-box-6 :color="['#0D4A81', '#209FDF']" style="margin-top:2vh; height:50vh">
            <div style="padding-top:1.5vh; margin-left:1vh"><owner-ship-chart style="height:23vh" /></div>
            <div style="margin-top:2vh;" class="title2">城市排行</div>
            <div style="margin-top:2vh; margin-left:1vh"><city-chart style="height:20vh" /></div>
          </dv-border-box-6>
        </el-col>

        <el-col :span="12">
          <div>
            <div align="center" class="title"> 古树名木检测与管理系统 </div>
            <div class="bmap-wrapper" align="center">
              <map-chart />
            </div>
          </div>
        </el-col>

        <el-col :span="6">
          <dv-decoration-8 :reverse="true" style="width:100%;height:4vh;margin-top: 10px" :color="['#0D4A81', '#209FDF']" />
          <time-text class="time" />
          <div style="margin-top: -4vh">
            <grade-chart style="height: 20vh" />
          </div>

          <dv-decoration-3 :reverse="true" style="width:100%;height:1vh;margin-top: 20px" :color="['#0D4A81', '#209FDF']" />

          <dv-border-box-4 :reverse="true" :color="['#0D4A81', '#209FDF']" style="height:63vh">
            <div style="margin-top: 2vh">
              <div class="title2">检测节点连接率</div>
              <dv-percent-pond :config="config" class="percent" align="center" />
            </div>
            <div class="title2">树种排行</div>
            <special-chart class="specialChart" style="margin-bottom:1vh" />
            <div style="margin-top:2vh;" class="title2">近年普查数量</div>
            <years-chart style="height:25vh" />
          </dv-border-box-4>

        </el-col>

      </el-row>
    </dv-border-box-4>
  </div>
</template>

<script>
import resize from './components/mixins/resize'
import GradeChart from './components/GradeChart'
import SpecialChart from './components/SpecialChart'
import MapChart from './components/MapChart'
import CityChart from './components/CityChart'
import TimeText from './components/TimeText'
import InfoText from './components/InfoText'
import OwnerShipChart from '@/views/mega_data/components/OwnerShipChart'
import YearsChart from '@/views/mega_data/components/YearsChart'
import screenfull from 'screenfull'
export default {
  name: 'Index',
  components: {
    GradeChart,
    MapChart,
    SpecialChart,
    CityChart,
    TimeText,
    InfoText,
    OwnerShipChart,
    YearsChart
  },
  mixins: [resize],
  data() {
    return {
      config: {
        value: 100,
        lineDash: [12, 2]
      },
      isFullscreen: false
    }
  },
  computed: {
  },
  mounted() {
    this.init()
  },
  created() {
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    click() {
      screenfull.request(document.querySelector('#dashboard'))
      screenfull.toggle()
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },
    init() {
      screenfull.on('change', this.change)
    },
    destroy() {
      screenfull.off('change', this.change)
    }
  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    height: 110%;
    width: 100%;
    background-color: #052341
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
  height: 52vh;
  margin-top: 5vh;
}
.specialChart{
  margin-top: 1vh;
  height: 20vh;
  margin-right: 3vh;
}
.time{
  height: 7vh;
  margin-right: 3px;
  padding-top: 10px;
}
.title{
  font: 36px Extra large;
  color: #27ADFC;
  padding-top: 5vh;
}
.percent{
  width:150px;
  height:60px;
  margin-top: 3vh;
  margin-left: auto;
  margin-right: auto;
}
.title2{
  font: 18px large;
  color: #27ADFC;
  margin-left: 18px

}
</style>
