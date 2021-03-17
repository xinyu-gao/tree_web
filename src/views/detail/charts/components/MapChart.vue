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
        }

      ]
    },
    createMap() {
      const map = new BMap.Map('map', { enableMapClick: false })
      map.centerAndZoom(new BMap.Point(120.64718, 31.310695), 14)
      map.setMapStyle({ styleJson: getMapStyle() })
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
  height: 100%;
  width: 100%;

}
</style>
