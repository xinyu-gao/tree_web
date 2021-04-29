<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'App',
  data() {
    return {
      ws: null
    }
  },
  created() {
    this.initWebSocket()
  },
  methods: {
    initWebSocket(id) {
      const wsUri = `${process.env.VUE_APP_WS}/imsi` // ws地址
      this.websocket = new WebSocket(wsUri)
      this.websocket.onopen = this.onOpen
      this.websocket.onerror = this.onError
      this.websocket.onmessage = this.onMessage
      this.websocket.onclose = this.onClose
    },

    onOpen() {
      console.log('ws连接成功')
    },
    onError(e) {
      console.log('ws连接错误')
    },
    onMessage(e) {
      store.dispatch('app/changeImsiDataUpdate', !this.$store.state.app.imsiDataUpdate)
    },
    onClose(e) {
      console.log('ws结束连接')
    }
  }
}
</script>
