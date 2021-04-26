<template>
  <div>
    <div class="time" :style="{height:height, width:width, fill:color} ">
      {{ time }}
    </div>
  </div>
</template>

<script>

import { handleTime } from '@/utils/commonUtil'

export default {
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    color: {
      type: String,
      default: '#209FDF'
    }
  },
  data() {
    return {
      timer: null,
      time: ''
    }
  },
  mounted() {
    this.config = {
      number: [1, 1, 1, 1, 1, 1],
      content: '{nt}-{nt}-{nt} {nt}:{nt}:{nt}'
    }
    this.getCurrentTime()
    this.timer = setInterval(() => { this.getCurrentTime() }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    timeCal() {
      if (!this.timer) {
        this.timer = setInterval(() => { this.getCurrentTime() }, 1000)
      }
    },
    getCurrentTime() {
      const date = new Date()// 当前时间
      this.time = handleTime(date)
    },

    /**
     * 补零
     */
    zeroFill(i) {
      return i >= 0 && i <= 9 ? '0' + i : i
    }
  }
}
</script>

<style scoped>
.time {
  /*position: absolute;*/
  text-align: right;
  font: 20px Extra large;
  color: #209FDF;

}

</style>
