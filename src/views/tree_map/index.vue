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
const tree1Png = new BMap.Icon(require('@/assets/map_marker/tree1.png'), mapSize, {})
const tree2Png = new BMap.Icon(require('@/assets/map_marker/tree2.png'), mapSize, {})
const tree3Png = new BMap.Icon(require('@/assets/map_marker/tree3.png'), mapSize, {})
export default {
  name: 'Index',
  data() {
    return {
      provinces: [],
      cities: [],
      selectProvince: '天津市',
      selectCity: '市辖区',
      provData: [],
      map: ''

    }
  },
  watch: {
    selectProvince: function(val) {
      this.selectCity = ''
      const p = this.provData.filter(item => {
        return item.province === val
      })[0]
      this.cities = p && p.cityList || []
    },
    selectCity: function(val) {
      if (val !== '') {
        this.handleChange()
      }
    }
  },
  created() {
    this.getExistedProvinceAndCity()
  },
  methods: {
    /**
     * 条件更改后，重新生成地图
     */
    handleChange() {
      this.createMap()
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
            this.handleChange()
          })
        }).catch(err => {
          console.log(err)
        })
    },

    /**
     * 创建地图
     */
    createMap() {
      const city = this.$route.query.city
      console.log('1', this.selectProvince)
      let data
      if (city) {
        data = city
        if (this.isMunicipalityOrHK_TW_M(city)) {
          this.selectProvince = city
          this.selectCity = ''
        } else {
          this.selectCity = city
        }
      } else {
        // url 上没有城市
        if (this.isMunicipalityOrHK_TW_M(this.selectProvince)) {
          data = this.selectProvince
        } else {
          data = this.selectCity
        }
      }
      this.map = new BMap.Map('map')
      this.map.centerAndZoom(data, 13)
      // 创建Map实例
      // 初始化地图,设置中心点坐标和地图级别

      const mapStyle = getMapStyle()
      this.map.setMapStyle({
        styleJson: mapStyle
      })
      // 开启鼠标滚轮缩放
      this.map.enableScrollWheelZoom(true)
      this.getTreeList(data)
      this.$route.query.city = ''
    },
    getTreeList(city) {
      getTreeListDataByCity(city)
        .then(data => {
          data.map(item => {
            this.addTreeMarker(item.longitude, item.latitude, item.chineseName, this.genContent(item), item.grade)
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
        `<div style="margin-top:-5px;margin-bottom:15px;"><strong>地 &nbsp &nbsp  &nbsp 址：&nbsp &nbsp  &nbsp</strong>${data.detailInfo || '-'}</div>` +
        `<span style="margin-top: 15px;"><strong>查看:</strong>` +
        `<span style="margin-top: 15px;margin-left:50px"><a style="color:#3ec9d2" href="/#/detail_info/list/?treeId=${data.treeId}">清单</a></span>` +
        `<span style="margin-top: 15px;margin-left:20px"><a style="color:#3EC9D2" href="/#/detail_info/charts/?treeId=${data.treeId}">图表</a></span>` +
        `</div>`
    },
    addTreeMarker(lng, lat, title, content, grade) {
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
      let marker
      switch (grade) {
        case '名木':
          marker = new BMap.Marker(new BMap.Point(lng, lat), { icon: treePng })
          break
        case '国家一级古树':
          marker = new BMap.Marker(new BMap.Point(lng, lat), { icon: tree1Png })
          break
        case '国家二级古树':
          marker = new BMap.Marker(new BMap.Point(lng, lat), { icon: tree2Png })
          break
        case '国家三级古树':
          marker = new BMap.Marker(new BMap.Point(lng, lat), { icon: tree3Png })
          break
      }
      // 将标注添加到地图中
      this.map.addOverlay(marker)
      // 点击显示窗口
      marker.addEventListener('click', function() {
        this.openInfoWindow(infoWindow)
      })
    },
    getUrlKey(name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null
    },
    isMunicipalityOrHK_TW_M(province) {
      return province.startsWith('北京') ||
        province.startsWith('天津') ||
        province.startsWith('上海') ||
        province.startsWith('重庆') ||
        province.startsWith('香港') ||
        province.startsWith('澳门') ||
        province.startsWith('台湾')
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
