<template>
  <div class="tab-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="grid-content bg-purple-light" style="font: 20px Extra large;" align="center"> 用户管理 </div>
      </div>
      <div class="card-body-right" style="padding-top: 10px;">
        <users />
      </div>
    </el-card>

  </div>
</template>

<script>
import Users from '@/views/usermanage/component/Users'
export default {
  name: 'UserManger',
  components: {
    Users
  },
  data() {
    return {
      total: 100,
      IMSIList: [],
      IMSITotal: 1
    }
  }
}
</script>

<style scoped>
.tab-container {
  margin: 42px;
}
</style>
