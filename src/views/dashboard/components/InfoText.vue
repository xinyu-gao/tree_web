<template>
  <div class="infoContainer" :style="{height:height,width:width}">
    <div class="title">基本信息</div>
    <el-row type="flex" style="margin: 20px 20px">
      <el-col :span="12">
        <span class="text1">普查总数：</span>
      </el-col>
      <el-col :span="12">
        <span class="text1">共计数目：</span>
      </el-col>
    </el-row>
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

    }
  },
  mounted() {

  },
  beforeDestroy() {
  },
  methods: {

  }
}
</script>

<style scoped>
.infoContainer{
  padding: 10px 15px;
}
.title{
  font: 18px large;
  color: #209FDF;
}
.text1{
  color: #fff;
}
</style>
