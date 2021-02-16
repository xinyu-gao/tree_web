<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column label="古树编号" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.treeId || '-' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="调查顺序号" align="center" min-width="92px">
        <template slot-scope="scope">
          <span>{{ scope.row.surveyNumber || '-' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="中文名" align="center" min-width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.chineseName || '-' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="俗名" align="center" min-width="80px">
        <template slot-scope="scope">
          <el-popover placement="right" width="200" trigger="click">
            <span>{{ scope.row.alias || '-' }}</span>
            <a slot="reference" style="color: #409EFF">查看</a>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="拉丁名" align="center" min-width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.latinName || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="科-属-种" align="center" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.family || '' }} - <br> {{ scope.row.genus || '' }} - {{ scope.row.species || '' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="所在位置" align="center" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.locationProvince || '' }} - {{ scope.row.locationCity || '' }} - {{ scope.row.locationDistrict || '' }}</span>
          <br>
          <el-popover placement="right" width="200" trigger="click">
            <span>
              {{ scope.row.locationDetail || '-' }}</span>
            <a slot="reference" style="color: #409EFF">详细地址</a>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="经纬度" align="center" min-width="130px">
        <template slot-scope="scope">
          <span>
            lng：{{ scope.row.longitude || '000.000000' }}<br>
            lat：{{ scope.row.latitude || '000.000000' }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="生长场所" align="center" min-width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.growthPlace || '-' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="分布特点" align="center" min-width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.distCH || '-' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="权属" align="center" min-width="50px">
        <template slot-scope="scope">
          <span>{{ scope.row.ownerShip || '-' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="树龄" align="center" min-width="70px">
        <template slot-scope="scope">
          <span>{{ scope.row.age || '-' }}年</span>
        </template>
      </el-table-column>

      <el-table-column label="古树等级" align="center" width="110px">
        <template slot-scope="scope">
          <span>{{ scope.row.grade }}</span>
          <!--          <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon" />-->
        </template>
      </el-table-column>

      <el-table-column label="树高 / 胸围" align="center" min-width="90px">
        <template slot-scope="scope">
          <span>{{ scope.row.height }} 米 <br> {{ scope.row.breastDiameter }} 厘米</span>
        </template>
      </el-table-column>

      <el-table-column label="冠幅" align="center" min-width="60px">
        <template slot-scope="scope">
          <el-popover placement="right" width="200" trigger="click">
            <span>平均：{{ scope.row.crownWidthAverage }} 米 <br>
              东西：{{ scope.row.crownWidthEW }} 米 <br>
              南北：{{ scope.row.crownWidthNS }} 米</span>
            <a slot="reference" style="color: #409EFF">查看</a>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="立地条件" align="center" min-width="90px">
        <template slot-scope="scope">
          <el-popover placement="right" width="80" trigger="click">
            <span>
              海拔：{{ scope.row.altitude || '0' }} 米 <br>
              坡向：{{ scope.row.aspect || '0' }} 米 <br>
              坡度：{{ scope.row.slope || '0' }} 度 <br>
              坡位：{{ scope.row.slopePosition || '-' }} 部 <br>
              土壤类型：{{ scope.row.soilType || '-' }} </span>
            <a slot="reference" style="color: #409EFF">查看</a>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="生长势" align="center" min-width="70px">
        <template slot-scope="scope">
          <span>{{ scope.row.growthVigor || '-' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="生长环境" align="center" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.env || '-' }}</span><br>
          <el-popover placement="right" width="200" trigger="click">
            <span>{{ scope.row. envFactor || '-' }}</span>
            <a slot="reference" style="color: #409EFF">影响因素</a>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="管护单位 / 管护人" align="center" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.management || '-' }}<br>{{ scope.row.guardian || '-' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="奇特性" align="center" min-width="65px">
        <template slot-scope="scope">
          <el-popover placement="right" width="200" trigger="click">
            <span>{{ scope.row.peculiarDetail }}</span>
            <a slot="reference" style="color: #409EFF">查看</a>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="现状" align="center" min-width="60px">
        <template slot-scope="scope">
          <el-popover placement="right" width="200" trigger="click">
            <span>
              <strong>保护现状：</strong>{{ scope.row.protectionStatus || '-' }} <br>
              <strong>保护现状：</strong>{{ scope.row.conserveStatus || '-' }}
            </span>
            <a slot="reference" style="color: #409EFF">查看</a>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="调查员/审核员" align="center" min-width="70px">
        <template slot-scope="scope">
          <el-popover placement="right" width="200" trigger="click">
            <span>
              <strong>调查员ID：</strong>{{ scope.row.declarerId || '-' }} <br>
              <strong>审核员ID：</strong>{{ scope.row.reviewerId || '-' }}
            </span>
            <a slot="reference" style="color: #409EFF">查看</a>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="详细描述" align="center" min-width="80px">
        <template slot-scope="scope">
          <el-popover placement="right" width="200" trigger="click">
            <span>{{ scope.row.detailInfo || '-' }}</span>
            <a slot="reference" style="color: #409EFF">查看</a>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="更新日期" align="center" width="95px">
        <template slot-scope="scope">
          <span>{{ handleTime(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
      align="center"
      style="padding-top: 17px"
      @current-change="handleCurrentChangePage"
    />
  </div>
</template>

<script>
import { getTreeListData } from '@/api/tree'
export default {
  name: 'ArticleList',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      currentPage: 1,
      pageSize: 10
    }
  },
  created() {
    this.getList(this.currentPage, this.pageSize)
  },
  methods: {
    getList: function(page, size) {
      page = page - 1
      getTreeListData({ page: page, size: size })
        .then(data => {
          this.list = data.list
          this.total = data.total
          this.listLoading = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleCurrentChangePage(currentPage) {
      console.log(currentPage)
      this.getList(currentPage, this.pageSize)
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

<style scoped>

</style>
