<template>
  <div>
    <dv-digital-flop :config="config" :style="{height:height, width:width} " />
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
      config: ''
    }
  },
  mounted() {
    this.config = {
      number: [100],
      content: '普查:{nt}棵'
    }
  },
  beforeDestroy() {

  },
  methods: {

  }
}
</script>
