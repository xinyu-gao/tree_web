<template>
  <div class="dashboard-editor-container">

    <el-row :gutter="32" style="margin:-5px 1px">
      <panel-group />
    </el-row>
    <el-row :gutter="32" style="background:#fff;padding:8px 0px; margin-bottom:12px;margin-top:12px">
      <line-chart-for-temp :chart-data="lineChartData" />
    </el-row>
    <el-row :gutter="32" style="background:#fff;padding:8px 0px; margin-bottom:12px;margin-top:12px">
      <line-chart2 :chart-data="lineChartData2" />
    </el-row>

    <el-row :gutter="32" style="margin-top:34px; ">
      <el-col :lg="8" :sm="8" :xs="24">
        <div class="chart-wrapper" style="height: 400px">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :lg="8" :sm="8" :xs="24">
        <div class="chart-wrapper" style="height: 400px" align="center">
          <defect-char class="defect" :defect-data="defectData" />
        </div>
      </el-col>
      <el-col :lg="8" :sm="8" :xs="24">
        <div class="chart-wrapper" style="height: 400px">
          <pie-chart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './PanelGroup'
import LineChartForTemp from '../components/LineChartForTemp'
import LineChart2 from '../components/LineChart2'
import RaddarChart from './MapChart'
import PieChart from './PieChart'
import DefectChar from './DefectChart'
import { getNodeDefectInfoByIMSI } from '@/api/imsi'

export default {
  name: 'Charts',
  components: {
    PanelGroup,
    LineChartForTemp,
    LineChart2,
    RaddarChart,
    PieChart,
    DefectChar
  },
  data() {
    return {
      lineChartData: [],
      lineChartData2: [],
      defectData: {}
    }
  },
  computed: {
  },
  mounted() {
    this.getDetectData(12145213)
  },
  methods: {
    getDetectData(imsi) {
      getNodeDefectInfoByIMSI({ imsi: imsi })
        .then(data => {
          this.defectData = data
        }).catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 12px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 5px 5px;
    margin-bottom: 32px;
  }
  .defect{
    margin-top: -30px;
    margin-left: 30px
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

</style>
