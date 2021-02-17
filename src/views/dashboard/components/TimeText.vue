<template>
  <div>
    <div class="time" :style="{height:height, width:width, fill:color} ">
      {{ time }}
    </div>
  </div>
</template>

<script>

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
      config: {
        number: [1, 1, 1, 1, 1, 1],
        content: '{nt}-{nt}-{nt} {nt}:{nt}:{nt}'
      },
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
      const month = this.zeroFill(date.getMonth() + 1)// 月
      const day = this.zeroFill(date.getDate())// 日
      const hour = this.zeroFill(date.getHours())// 时
      const minute = this.zeroFill(date.getMinutes())// 分
      const second = this.zeroFill(date.getSeconds())// 秒

      this.time = date.getFullYear() + '-' + month + '-' + day + ' ' +
          hour + ':' + minute + ':' + second
      // this.config = {
      //   number: [
      //     date.getFullYear(),
      //     date.getMonth() + 1,
      //     date.getDate(),
      //     date.getHours(),
      //     date.getMinutes(),
      //     date.getSeconds()
      //   ],
      //   content: '{nt}-' + monthContent + '-' + dayContent + ' ' +
      //     hourContent + ':' + minuteContent + ':' + secondContent
      // }
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
