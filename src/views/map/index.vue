<template>
  <el-col class="app-container">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="3" :lg="3" :xl="3">
        <div style="margin-bottom: 30px" align="center">
          <div class="select-text"> 选择省份</div>
          <el-select v-model="selectProvince" placeholder="请选择" class="select-g">
            <el-option
              v-for="item in provinces"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
          <div class="select-text"> 选择地级市</div>
          <el-select v-model="selectCity" placeholder="请选择" class="select-g">
            <el-option
              v-for="item in cities"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
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
import { getExistedProvinceAndCity } from '@/api/statistic'
import { getMapStyle } from '@/utils/mapStyle'
import { getTreeListDataByCity } from '@/api/tree'
const mapSize = new BMap.Size(40, 40)
const treePng = new BMap.Icon(require('@/assets/map_marker/tree.png'), mapSize, {})
export default {
  name: 'Index',
  data() {
    return {
      provinces: [],
      cities: [],
      selectProvince: '',
      selectCity: '',
      provData: '',
      map: ''

    }
  },
  watch: {
    selectProvince: function(val) {
      this.selectCity = ''
      this.cities = this.provData.filter(item => {
        return item.province === val
      })[0].cityList
    },
    selectCity: function(val) {
      if (val !== '') {
        this.handleChange()
      }
    }
  },
  mounted() {
    this.selectCity = '苏州市'
    this.getExistedProvinceAndCity()
    this.createMap()
    this.getTreeList()
  },
  methods: {
    /**
     * 条件更改后，重新生成地图
     */
    handleChange() {
      this.createMap()
      this.getTreeList()
    },

    /**
     * 获取数据库中存在的省市
     */
    getExistedProvinceAndCity() {
      getExistedProvinceAndCity()
        .then(data => {
          // 保存数据
          this.provData = data
          // 读取所有存在的省份
          data.map(item => {
            this.provinces.push(item.province)
          })
        }).catch(err => {
          console.log(err)
        })
    },

    /**
     * 创建地图
     */
    createMap() {
      // 创建Map实例
      this.map = new BMap.Map('map')
      // 初始化地图,设置中心点坐标和地图级别
      this.map.centerAndZoom(this.selectCity, 13)
      const mapStyle = getMapStyle()
      this.map.setMapStyle({
        styleJson: mapStyle
      })
      // 开启鼠标滚轮缩放
      this.map.enableScrollWheelZoom(true)
    },
    getTreeList() {
      getTreeListDataByCity(this.selectCity)
        .then(data => {
          console.log(JSON.stringify(data))
          data.map(item => {
            this.addTreeMarker(item.longitude, item.latitude, item.chineseName, this.genContent(item))
          })
        }).catch(err => {
          console.log(err)
        })
    },
    genContent(data) {
      return `<div style="padding-top:15px;padding-left: 40px">` +
        `<div><strong>古树编号：&nbsp &nbsp  &nbsp</strong>${data.treeId}</div><br />` +
        `<div style="margin-top:-5px;"><strong>树 &nbsp &nbsp  &nbsp 龄：&nbsp &nbsp  &nbsp</strong>${data.age}年</div><br />` +
        `<div style="margin-top:-5px;"><strong>古树等级：&nbsp &nbsp  &nbsp</strong>${data.grade}</div><br />` +
        `<div style="margin-top:-5px;"><strong>权 &nbsp &nbsp  &nbsp 属：&nbsp &nbsp  &nbsp</strong>${data.ownerShip}</div><br />` +
        `<div style="margin-top:-5px;margin-bottom:15px;"><strong>描 &nbsp &nbsp  &nbsp 述：&nbsp &nbsp  &nbsp</strong>${data.detailInfo || '-'}</div></div>`
    },
    addTreeMarker(lng, lat, title, content) {
      title = `<strong>${title}</strong>`
      // 信息窗口配置
      const opts = {
        width: 270, // 信息窗口宽度
        height: 0, // 信息窗口高度自动调整
        title: title, // 信息窗口标题
        enableMessage: false// 设置允许信息窗发送短息
      }
      // 窗口显示内容
      const infoWindow = new BMap.InfoWindow(content, opts)
      // 创建标注
      const marker = new BMap.Marker(new BMap.Point(lng, lat), { icon: treePng })
      // 将标注添加到地图中
      this.map.addOverlay(marker)
      // 点击显示窗口
      marker.addEventListener('click', function() {
        this.openInfoWindow(infoWindow)
      })
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
.select-g {
 margin-top: 15px;
}
.select-text{
  font: 14px Base;
  margin-left: 2px;
  padding-top: 20px;
}
</style>
