<template>
  <div class="app-container">
    <el-card class="box-card1">
      <div slot="header" class="clearfix">
        <div align="center" style="font:18px large">节点匹配</div>
      </div>
      <div>
        <div align="center">
          树木编号：<el-input
            v-model="treeId"

            class="input-id"
            type="text"
            placeholder="请填写树木编号"
            @keyup.enter.native="getTreeImsiByTreeId"
          >
            <el-button slot="append" icon="el-icon-search" type="primary" @click="getTreeImsiByTreeId" />
          </el-input>
        </div>
        <div align="center" class="icon-bottom">
          <div> <i class="el-icon-bottom" /></div>
          <div>
            <span style="font:12px Extra Small"> 可以先查询对应的IMSI，若不存在则不会显示</span>
          </div>
        </div>

        <div align="center">
          节点IMSI：<el-input
            v-model="imsi"
            class="input-id"
            type="text"
            placeholder="请填写节点IMSI"
          >
            <el-button slot="append"type="primary" icon="el-icon-edit" @click="setTreeImsiByTreeId">修改</el-button>
          </el-input>
        </div>
      </div>
    </el-card>

    <el-card class="box-card2">
      <div slot="header" class="clearfix">
        <div align="center" style="font:18px large">阈值设置</div>
      </div>
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div align="center">
            温度上限：<el-input
              v-model="warn.tempUpper"
              class="input"
              type="text"
              placeholder="请填写温度上限"
            >
              <i slot="suffix">°C</i>
            </el-input>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div align="center">
            温度下限：<el-input
              v-model="warn.tempLower"
              class="input"
              type="text"
              placeholder="请填写温度下限"
            >
              <i slot="suffix">°C</i>
            </el-input>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div align="center">
            湿度上限：<el-input
              v-model="warn.humidityUpper"
              class="input"
              type="text"
              placeholder="请填写湿度上限"
            >
              <i slot="suffix">%</i>
            </el-input>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div align="center">
            湿度下限：<el-input
              v-model="warn.humidityLower"
              class="input"
              type="text"
              placeholder="请填写湿度下限"
            >
              <i slot="suffix">%</i>
            </el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div align="center">
            倾斜度上限：<el-input
              v-model="warn.slantUpper"
              class="input2"
              type="text"
              placeholder="请填写倾斜度上限"
            >
              <i slot="suffix">°</i>
            </el-input>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div align="center">
            倾斜度下限：<el-input
              v-model="warn.slantLower"
              class="input2"
              type="text"
              placeholder="请填写倾斜度下限"
            >
              <i slot="suffix">°</i>
            </el-input>
          </div>
        </el-col>
      </el-row>
      <div align="center" style="margin-top:40px"><el-button type="primary" @click="setThreshold">确定修改</el-button></div>

    </el-card>
  </div>
</template>

<script>
import { getImsiByTreeId, setImsiByTreeId } from '@/api/tree'
import { getWarnThreshold, setWarnThreshold } from '@/api/warn_threshold'

export default {
  data() {
    return {
      treeId: '',
      imsi: '',
      warn: {
        tempUpper: '',
        tempLower: '',
        humidityUpper: '',
        humidityLower: '',
        slantUpper: '',
        slantLower: ''
      }
    }
  },
  mounted() {
    this.getThreshold()
  },
  methods: {
    getTreeImsiByTreeId() {
      this.imsi = ''
      getImsiByTreeId(this.treeId)
        .then(data => {
          console.log(data)
          this.imsi = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    setTreeImsiByTreeId() {
      const data = {
        treeId: this.treeId,
        imsi: this.imsi
      }
      setImsiByTreeId(data)
        .then(data => {
          this.$notify({
            title: '修改成功',
            type: 'success'
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    getThreshold() {
      getWarnThreshold()
        .then(data => {
          this.warn = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    setThreshold() {
      setWarnThreshold(this.warn)
        .then(data => {
          this.$notify({
            title: '修改成功',
            type: 'success'
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.box-card1{
  margin-top: 2vh;
  height: 40vh;
  width: 100%;
}
.box-card2{
  margin-top: 5vh;
  height: 40vh;
}
.input-id{
  margin-top: 5vh;
  width: 500px;
}
.input{
  margin-top: 3.5vh;
  width: 500px;
  margin-left: 15px;
}
.input2{
  margin-top: 3.5vh;
  width: 500px;
}
.input-imsi1{
  margin-top: 5vh;
  width: 500px;
}
.clearfix:before,
.clearfix:after{
  display: table;
  content: "";
}
.clearfix:after{
  clear: both
}
.row-bg{
  margin-top: 10vh;
}
.icon-bottom{
  margin-top: 3vh;
  font-size: 26px;
}
</style>

