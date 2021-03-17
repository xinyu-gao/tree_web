<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="IMSI" min-width="85" align="center">
      <template slot-scope="scope">
        {{ scope.row.imsi || '-' }}
      </template>
    </el-table-column>
    <el-table-column label="环境温度" min-width="65" align="center">
      <template slot-scope="scope">
        {{ scope.row.temp.toFixed(1) }} °C
      </template>
    </el-table-column>
    <el-table-column label="环境湿度" min-width="65" align="center">
      <template slot-scope="scope">
        {{ scope.row.humidity.toFixed(1) }} %
      </template>
    </el-table-column>
    <el-table-column label="倾斜度" min-width="65" align="center">
      <template slot-scope="scope">
        {{ scope.row.slant.toFixed(1) }}  °
      </template>
    </el-table-column>
    <el-table-column label="发送时间" width="160" align="center">
      <template slot-scope="scope">
        {{ handleTime(scope.row.sendTime) || '-' }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getNodeHistoryInfoByIMSI } from '@/api/imsi'

export default {
  data() {
    return {
      list: null,
      imsi: 12145213,
      total: 0,
      listLoading: true,
      currentPage: 0,
      pageSize: 6
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const data = {
        imsi: this.imsi,
        page: this.currentPage,
        size: this.pageSize
      }
      getNodeHistoryInfoByIMSI(data).then(data => {
        this.list = data.list
        this.total = data.total
        this.listLoading = false
      })
    },
    handleTime(time) {
      time = new Date(time)
      const month = time.getMonth() + 1
      time = time.getFullYear() + '-' + month + '-' + time.getDate() + ' ' +
        time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
      return time
    }
  }
}
</script>
