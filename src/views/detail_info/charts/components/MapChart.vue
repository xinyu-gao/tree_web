<template>
  <div id="map" />
</template>

<script>

import BMap from 'BMap'
import { getMapStyle } from '@/utils/mapStyle'
const mapSize = new BMap.Size(40, 40)
const treePng = new BMap.Icon(require('@/assets/map_marker/tree.png'), mapSize, {})

export default {
  name: 'MapMini',
  props: {
    info: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      chart: null,
      mapData: []
    }
  },
  watch: {
    info: {
      handler(newValue, oldValue) {
        this.createMap(newValue)
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.createMap(this.info)
    })
  },
  methods: {
    createMap(info) {
      if (info || info.treeId) {
        console.log('info', info)
        this.map = new BMap.Map('map')
        this.map.centerAndZoom(new BMap.Point(info.longitude, info.latitude), 13)
        this.map.setMapStyle({
          styleJson: getMapStyle()
        })
        this.map.enableScrollWheelZoom(true)
        this.addTreeMarker(info.longitude, info.latitude, info.chineseName, this.genContent(info))
      }
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
    },
    genContent(data) {
      return `<div style="padding-top:15px;padding-left: 40px">` +
          `<div><strong>古树编号：&nbsp &nbsp  &nbsp</strong>${data.treeId}</div><br />` +
          `<div style="margin-top:-5px;"><strong>树 &nbsp &nbsp  &nbsp 龄：&nbsp &nbsp  &nbsp</strong>${data.age}年</div><br />` +
          `<div style="margin-top:-5px;"><strong>古树等级：&nbsp &nbsp  &nbsp</strong>${data.grade}</div><br />` +
          `<div style="margin-top:-5px;"><strong>权 &nbsp &nbsp  &nbsp 属：&nbsp &nbsp  &nbsp</strong>${data.ownerShip}</div><br />` +
          `<div style="margin-top:-5px;margin-bottom:15px;"><strong>描 &nbsp &nbsp  &nbsp 述：&nbsp &nbsp  &nbsp</strong>${data.detailInfo || '-'}</div>` +
          `<span style="margin-top: 15px;"><strong>查看:</strong>` +
          `<span style="margin-top: 15px;margin-left:50px"><a style="color:#3ec9d2" href="/#/detail/list/?treeId=${data.treeId}">清单</a></span>` +
          `<span style="margin-top: 15px;margin-left:20px"><a style="color:#3EC9D2" href="/#/detail/charts/?treeId=${data.treeId}">图表</a></span>` +
          `</div>`
    }
  }
}
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>
