<template>
  <div class="infoContainer" :style="{height:height,width:width}">
    <div class="title">基本信息</div>
    <el-row :gutter="24" style="margin: 2vh 0vh">
      <el-col :span="12">
        <span class="text1">普查总数：</span>
        <span class="text2">{{ total }}</span>
      </el-col>
      <el-col :span="12">
        <span class="text1">检测总数：</span>
        <span class="text2">{{ detectionNums }}</span>
      </el-col>
    </el-row>
    <div class="title">种类统计</div>
    <el-row :gutter="24" style="margin: 2vh 0vh">
      <el-col :span="8">
        <span class="text1">科：</span>
        <span class="text2">{{ familyNums }}</span>
      </el-col>
      <el-col :span="8">
        <span class="text1">属：</span>
        <span class="text2">{{ genusNums }}</span>
      </el-col>
      <el-col :span="8">
        <span class="text1">种：</span>
        <span class="text2">{{ speciesNums }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <span class="title">生长场所</span>
        <growth-place style="height:12vh;margin-top: 2vh" />
      </el-col>
      <el-col :span="12">
        <span class="title">分布特点</span>
        <dist-c-h style="height:12vh;margin-top: 2vh" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GrowthPlace from './GrowthPlace'
import DistCH from './DistCH'
import resize from './mixins/resize'
export default {
  components: {
    GrowthPlace,
    DistCH
  },
  mixins: [resize],
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
      total: 5418,
      detectionNums: 249,
      familyNums: 311,
      genusNums: 423,
      speciesNums: 516
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
  color: #27ADFC;
  margin: 8px
}
.text1{
  font: 16px large;
  color: #fff;
}

.text2{
  color: #84fab0;
  font: 27px Medium
}
</style>
