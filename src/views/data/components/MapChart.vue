<template>
  <div id="map" />
</template>

<script>

import BMap from 'BMap'
const mapv = require('mapv')
import { getMapStyle } from '@/utils/mapStyle'

export default {
  name: 'Map',
  data() {
    return {
      chart: null,
      mapData: []
    }
  },
  mounted() {
    this.getData()
    this.createMap()
  },
  methods: {

    getData() {
      this.mapData = [
        {
          geometry: {
            type: 'Point',
            coordinates: [120.64718, 31.310695]
          }
        },
        {
          geometry: {
            type: 'Point',
            coordinates: [120.645708, 31.312536]
          }
        },
        {
          geometry: {
            type: 'Point',
            coordinates: [120.647433, 31.308618]
          }
        },
        {
          geometry: {
            type: 'Point',
            coordinates: [120.640354, 31.313924]
          }
        }

      ]
    },
    createMap() {
      // 创建Map实例
      const map = new BMap.Map('map', {
        enableMapClick: false
      })
      // 初始化地图,设置中心点坐标和地图级别
      map.centerAndZoom(new BMap.Point(120.64718, 31.310695), 14)
      // 开启鼠标滚轮缩放map.enableScrollWheelZoom(true)
      const mapStyle = getMapStyle()
      map.setMapStyle({
        styleJson: mapStyle
      })

      const dataSet = new mapv.DataSet(this.mapData)

      const options = {
        fillStyle: 'rgba(255, 50, 50, 0.6)',
        maxSize: 20,
        max: 30,
        draw: 'bubble'
      }

      // eslint-disable-next-line new-cap
      new mapv.baiduMapLayer(map, dataSet, options)
    },
    genMapDataItem(x, y) {
      return {
        geometry: {
          type: 'Point',
          coordinates: [x, y]
        }
      }
    }
  }
}
</script>

<style scoped>
#map {
  height: 300px;
  width: 100%;

}
</style>
