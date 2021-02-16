<template>
  <el-col class="app-container">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="3" :lg="3" :xl="3">
        <el-button>sda</el-button>
      </el-col>
      <el-col :xs="24" :sm="24" :md="21" :lg="21" :xl="21">
        <el-card class="box-card">
          <div id="map" />
        </el-card>
      </el-col>
    </el-row>

  </el-col>
</template>

<script>
import BMap from 'BMap'
export default {
  name: 'Index',
  data() {
    return {
      map: ''
    }
  },
  mounted() {
    this.createMap(120.646494, 31.314395)
    this.refreshMap()
  },
  methods: {
    createMap(x, y) {
      // 创建Map实例
      this.map = new BMap.Map('map')
      // 初始化地图,设置中心点坐标和地图级别
      this.map.centerAndZoom(new BMap.Point(x, y), 15)
      // 添加地图类型控件
      this.map.addControl(new BMap.MapTypeControl({
        // eslint-disable-next-line no-undef
        mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
      }))
      // 设置地图显示的城市 此项是必须设置的
      this.map.setCurrentCity('苏州')
      // 开启鼠标滚轮缩放
      this.map.enableScrollWheelZoom(true)
    }
  }
}
</script>

<style scoped>
#map {
  height: 90vh;
  margin: -18px;
}

.box-card {
  background-color: #cfd9df;
}
</style>
