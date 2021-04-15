<template>
  <div>
    <dv-capsule-chart :config="config" :style="{width:width,height:height}" />
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
          name: '苏州',
          value: 167
        },
        {
          name: '上海',
          value: 123
        },
        {
          name: '北京',
          value: 111
        },
        {
          name: '郑州',
          value: 98
        },
        {
          name: '云南',
          value: 75
        }
      ],
      unit: '/ 棵'
    }
  },
  beforeDestroy() {

  },
  methods: {

  }
}
</script>
