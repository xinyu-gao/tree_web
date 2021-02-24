<template>
  <div class="dashboard-editor-container">

    <el-row :gutter="32" style="margin:-5px 1px">
      <!--      <panel-group />-->
    </el-row>

    <el-row style="background:#fff;padding:8px 16px;margin-bottom:12px;margin-top:12px;">
      <!--      <line-chart :chart-data="lineChartData" />-->
    </el-row>

    <el-row :gutter="32" style="margin-top:34px;">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <!--          <raddar-chart />-->
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <!--          <pie-chart />-->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import PanelGroup from './PanelGroup'
// import LineChart from './LineChart'
// import RaddarChart from './MapChart'
// import PieChart from './PieChart'

export default {
  name: 'Charts',
  components: {
    // PanelGroup,
    // LineChart,
    // RaddarChart,
    // PieChart
  },
  computed: {
    // lineChartData: function() {
    //   return this.$store.getters.lineData[this.$store.getters.currentNode]
    // }
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
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
