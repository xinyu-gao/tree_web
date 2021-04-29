<template>
  <div class="dashboard-editor-container">

    <el-row :gutter="32" style="margin:-5px 1px">
      <panel-group :imsi="imsi" @panelImsiChange="imsiChange" />
    </el-row>
    <el-row :gutter="32" style="background:#fff;padding:8px 1px; margin:12px 1px">
      <line-chart-for-temp :chart-data="lineChartData" />
    </el-row>
    <el-row :gutter="32" style="background:#fff;padding:8px 1px; margin:12px 1px">
      <line-chart-for-humidity :chart-data="lineChartData" />
    </el-row>
    <el-row :gutter="32" style="background:#fff;padding:8px 1px; margin:12px 1px">
      <line-chart-for-slant :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32" style="margin-top:34px; ">
      <el-col :lg="8" :sm="8" :xs="24">
        <div class="chart-wrapper" style="height: 400px">
          <map-chart :info="mapData" />
        </div>
      </el-col>
      <el-col :lg="8" :sm="8" :xs="24">
        <div class="chart-wrapper" style="height: 400px" align="center">
          <defect-char class="defect" :defect-data="defectData" />
        </div>
      </el-col>
      <el-col :lg="8" :sm="8" :xs="24">
        <div class="chart-wrapper" style="height: 400px">
          <table-chart :imsi="imsi" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './PanelGroup'
import LineChartForTemp from '../components/LineChartForTemp'
import LineChartForHumidity from '../components/LineChartForHumidity'
import LineChartForSlant from '../components/LineChartForSlant'
import MapChart from './MapChart'
import TableChart from './TableChart'
import DefectChar from './DefectChart'
import { getLineDataByIMSI, getNodeDefectInfoByIMSI } from '@/api/imsi'
import { getTreeById } from '@/api/tree'

export default {
  name: 'Charts',
  components: {
    PanelGroup,
    LineChartForTemp,
    LineChartForHumidity,
    LineChartForSlant,
    MapChart,
    TableChart,
    DefectChar

  },
  data() {
    return {
      treeId: 13,
      imsi: 12312413212,
      lineChartData: [],
      defectData: {},
      tableData: {},
      mapData: {}
    }
  },
  computed: {
    dataUpdate() {
      return this.$store.state.app.imsiDataUpdate
    }
  },
  watch: {
    dataUpdate: function(val) {
      this.getDetectData(this.imsi)
      this.getLineData(this.imsi)
      this.getTreeInfo(this.treeId)
    }
  },
  mounted() {
    this.getDetectData(this.imsi)
    this.getLineData(this.imsi)
    this.getTreeInfo(this.treeId)
  },
  methods: {
    getDetectData(imsi) {
      getNodeDefectInfoByIMSI({ imsi: imsi })
        .then(data => {
          this.defectData = data
        }).catch(err => {
          console.log(err)
        })
    },
    getLineData(imsi) {
      getLineDataByIMSI({ imsi: imsi })
        .then(data => {
          this.lineChartData = data
        })
    },
    getTreeInfo() {
      getTreeById({ treeId: this.treeId })
        .then(data => {
          this.mapData = data
        })
        .catch(err => {
          this.$message.error(
            `查询错误${err}`
          )
        })
    },
    imsiChange(data) {
      getTreeById({ treeId: data })
        .then(data => {
          this.imsi = data
          this.getDetectData(this.imsi)
          this.getLineData(this.imsi)
        })
        .catch(err => {
          this.$message.error(
            `查询错误${err}`
          )
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
