<template>
  <div class="tab-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="grid-content bg-purple-light" style="font: 20px Extra large;" align="center"> IMSI 设置 </div>
      </div>
      <div class="card-body" style="padding-top: 10px; height: 70vh;">
        <div style="font: 16px Medium;color: #909399;">当前数据库中所记录的 IMSI 节点总数 ：{{ IMSITotal }}</div>
        <el-table v-loading="loading" :data="IMSIList" style="max-height: 40vh; margin-top:30px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
          <el-table-column label="IMSI 号" min-width="130" align="center">
            <template slot-scope="scope">
              {{ scope.row.imsi }}
            </template>
          </el-table-column>
          <el-table-column label="上次发送数据时间" min-width="130" align="center">
            <template slot-scope="scope">
              {{ scope.row.lastSendTime }}
            </template>
          </el-table-column>
          <el-table-column label="数据距今时间间隔" min-width="130" align="center">
            <template slot-scope="scope">
              {{ scope.row.lastToNowTime }}
            </template>
          </el-table-column>
          <el-table-column label="删除操作" min-width="80" align="center">
            <el-button size="mini" type="danger" @click="open($event)">
              Delete
            </el-button>
          </el-table-column>
        </el-table>
        <div style="padding-top: 25px; padding-left: 5%; font:	15px Extra Small">设置说明：<i class="header-icon el-icon-info" /></div>
        <div style="padding-left:10%; padding-top: 10px; font:	13px Extra Small">
          1) 所使用过的 IMSI 都会被记录到数据库中进行统计；
        </div>
        <div style="padding-left:10%; padding-top: 10px; font:	13px Extra Small">2) 如果不再使用该
          IMSI，请在上方进行删除，否则影响”节点统计功能“
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getImsiList, deleteImsi } from '@/api/nodeInfo'

export default {
  name: 'Setting',
  data() {
    return {
      loading: true,
      IMSIList: [],
      IMSITotal: 1
    }
  },
  created() {
    // this.IMSIList = this.$store.getters.imsiList
    this.get()
    this.IMSITotal = this.$store.getters.imsiTotal
    this.loading = false
  },
  methods: {
    get: function() {
      getImsiList({
        page: 0,
        size: 1000
      })
        .then(data => {
          console.log(data)
          this.IMSIList = data
        }).catch(err => {
          console.log(err)
        })
    },
    delete: function(IMSI) {
      deleteImsi(IMSI)
        .then(data => {
          return data
        })
        .catch(() => {
          return false
        })
    },
    open: function(event) {
      const IMSI = event.currentTarget.parentElement.parentElement.previousElementSibling.previousElementSibling.innerText
      this.$confirm('此操作将删除该 IMSI, 是否继续?', '警告', {
        confirmButtonText: '取消',
        cancelButtonText: '确定',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }).catch(() => {
        if (this.delete(IMSI)) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } else {
          this.$message({
            type: 'warning',
            message: '删除失败，系统错误！'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.tab-container {
  margin: 42px;
}
.card-body {
  display: block;
  height: auto;
  bottom: 0;
  top: 0;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
