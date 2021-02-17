<template>
  <div>
    <dv-conical-column-chart :config="config" :style="{height:height, width:width} " />
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
      default: '20vh'
    }
  },
  data() {
    return {
      config: {}
    }
  },
  mounted() {
    this.config = {
      data: [
        {
          name: '银杏',
          value: 55
        },
        {
          name: '国槐',
          value: 120
        },
        {
          name: '龙柏',
          value: 71
        },
        {
          name: '楸树',
          value: 66
        },
        {
          name: '雪松',
          value: 80
        },
        {
          name: '黑松',
          value: 35
        },
        {
          name: '龙柏',
          value: 15
        }
      ]
    }
  },
  beforeDestroy() {

  },
  methods: {

  }
}
</script>
