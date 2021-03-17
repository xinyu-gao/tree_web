<template>
  <div class="app-container">

    <el-row :gutter="24" class="search">
      <el-col :xs="8" :sm="7" :md="6" :lg="5" :xl="4">
        <el-input v-model="inputSearchName" placeholder="请输入想要搜索的内容" />
      </el-col>
      <el-col :xs="15" :sm="16" :md="17" :lg="18" :xl="4" class="search-button">
        <el-button type="primary" icon="el-icon-search" @click="searchByName"> 搜索</el-button>
        <el-button type="info" icon="el-icon-delete" @click="cleanSearch"> 清除搜索</el-button>
      </el-col>
    </el-row>

    <el-table
      id="tableData"
      v-loading="listLoading"
      :data="list"
      :height="height"
      :row-style="{height: '90px'}"
      border
      fit
      highlight-current-row
      style="width: 100%; margin-top:30px"
      @sort-change="sortChangeHandle"
    >
      <el-table-column id="tableDataItem" label="古树编号" align="center" fixed="left" width="101" sortable="custom">
        <template slot-scope="scope">
          <span>{{ scope.row.treeId || '-' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="调查顺序号" align="center" min-width="115px" sortable="custom">
        <template slot-scope="scope">
          <span>{{ scope.row.surveyNumber || '-' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="中文名" align="center" min-width="90px" sortable="custom">
        <template slot-scope="scope">
          <span>{{ scope.row.chineseName || '-' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="俗 名 /  拉丁名" align="center" min-width="70px">
        <template slot-scope="scope">
          <el-popover placement="right" width="200" trigger="click">
            <span>俗名：{{ scope.row.alias || '-' }}</span>
            <span>拉丁名：{{ scope.row.latinName || '-' }}</span>
            <a slot="reference" style="color: #409EFF">查看</a>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="科-属-种" align="center" min-width="100px" sortable="custom">
        <template slot-scope="scope">
          <span>{{ scope.row.family || '-' }}  <br> {{ scope.row.genus || '-' }} <br> {{ scope.row.species || '-' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="所在位置" align="center" min-width="200px" sortable="custom">
        <template slot-scope="scope">
          <span>{{ scope.row.locationProvince || '' }} - {{ scope.row.locationCity || '' }} - {{ scope.row.locationDistrict || '' }}</span>
          <br>
          <span>{{ scope.row.locationDetail ? '(' + scope.row.locationDetail + ')' : '' }}</span>
          <!--          <el-popover placement="right" width="200" trigger="click">-->
          <!--            <span>-->
          <!--              {{ scope.row.locationDetail || '-' }}</span>-->
          <!--            <a slot="reference" style="color: #409EFF">详细地址</a>-->
          <!--          </el-popover>-->
        </template>
      </el-table-column>

      <el-table-column label="经纬度" align="center" min-width="130px" sortable="custom">
        <template slot-scope="scope">
          <span>
            lng：{{ scope.row.longitude || '000.000000' }}<br>
            lat：{{ scope.row.latitude || '000.000000' }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="生长场所" align="center" min-width="101px" sortable="custom">
        <template slot-scope="scope">
          <span>{{ scope.row.growthPlace || '-' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="分布特点" align="center" min-width="101px" sortable="custom">
        <template slot-scope="scope">
          <span>{{ scope.row.distCH || '-' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="权属" align="center" min-width="80px" sortable="custom">
        <template slot-scope="scope">
          <span>{{ scope.row.ownerShip || '-' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="树龄" align="center" min-width="80px" sortable="custom">
        <template slot-scope="scope">
          <span>{{ scope.row.age || '-' }}年</span>
        </template>
      </el-table-column>

      <el-table-column label="古树等级" align="center" width="105px" sortable="custom">
        <template slot-scope="scope">
          <span>{{ scope.row.grade }}</span>
          <!--          <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon" />-->
        </template>
      </el-table-column>

      <el-table-column label="树高 / 胸围" align="center" min-width="115px" sortable="custom">
        <template slot-scope="scope">
          <span>{{ scope.row.height ? scope.row.height + '米' : '-' }} <br>{{ scope.row.breastDiameter ? scope.row.breastDiameter + '厘米' : '-' }}  </span>
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

      <el-table-column label="立地条件" align="center" min-width="80px">
        <template slot-scope="scope">
          <el-popover placement="right" width="80" trigger="click">
            <span>
              海拔：{{ scope.row.altitude || '0' }} 米 <br>
              坡向：{{ scope.row.aspect || '0' }} <br>
              坡度：{{ scope.row.slope || '0' }} 度 <br>
              坡位：{{ scope.row.slopePosition || '-' }} 部 <br>
              土壤类型：{{ scope.row.soilType || '-' }} </span>
            <a slot="reference" style="color: #409EFF">查看</a>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="生长势/ 环境" align="center" min-width="70px">
        <template slot-scope="scope">
          <span>{{ scope.row.growthVigor || '-' }}</span><br>
          <span>{{ scope.row.env || '-' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="环境影响因素" align="center" min-width="110px">
        <template slot-scope="scope">
          <el-popover placement="right" width="200" trigger="click">
            <span>{{ scope.row. envFactor || '-' }}</span>
            <a slot="reference" style="color: #409EFF">查看</a>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="管护单位 / 管护人" align="center" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.management || '-' }}<br>{{ scope.row.guardian || '-' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="其他信息" align="center" min-width="80px">
        <template slot-scope="scope">
          <el-popover placement="right" width="200" trigger="click">
            <span>
              <strong>奇特性：</strong>{{ scope.row.peculiarDetail }}<br>
              <strong>保护现状：</strong>{{ scope.row.protectionStatus || '-' }} <br>
              <strong>复壮现状：</strong>{{ scope.row.conserveStatus || '-' }} <br>
              <strong>详细描述：</strong>{{ scope.row.detailInfo || '-' }}
            </span>
            <a slot="reference" style="color: #409EFF">查看</a>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="调查员/审核员" align="center" min-width="80px">
        <template slot-scope="scope">
          {{ scope.row.declarerId || '-' }} <br>
          {{ scope.row.reviewerId || '-' }}
        </template>
      </el-table-column>

      <el-table-column label="更新时间" align="center" width="101px" sortable="custom">
        <template slot-scope="scope">
          <span>{{ handleTime1(scope.row.updateTime) }} <br> {{ handleTime2(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="查看图表" fixed="right" align="center" width="60px">
        <template slot-scope="scope">
          <a style="color: #409EFF" @click="goToChart(scope.row.treeId)">图表</a>
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
import { getTreeListData, getTreeListSorted } from '@/api/tree'
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
      height: '80vh',
      list: null,
      total: 0,
      listLoading: true,
      currentPage: 1,
      pageSize: 9,
      inputSearchName: '',
      timeout: null,
      dict: { '古树编号': ['treeId'],
        '调查顺序号': ['surveyNumber'],
        '中文名': ['chineseName'],
        '科-属-种': ['family', 'genus', 'species'],
        '所在位置': ['locationProvince', 'locationCity', 'locationDistrict', 'locationDetail'],
        '经纬度': ['longitude', 'latitude'],
        '生长场所': ['growthPlace'],
        '分布特点': ['distCH'],
        '权属': ['ownerShip'],
        '树龄': ['age'],
        '古树等级': ['grade'],
        '树高 / 胸围': ['height', 'breastDiameter'],
        '更新时间': ['updateTime']
      }
    }
  },
  mounted() {
    this.getAutoHeight()
    const self = this
    window.onresize = function() {
      self.vueDebounce()
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
    cleanSearch() {
      this.listLoading = true
      this.getList(this.currentPage, this.pageSize)
    },
    handleCurrentChangePage(currentPage) {
      console.log(currentPage)
      this.getList(currentPage, this.pageSize)
    },
    handleTime(time) {
      time = new Date(time)
      const month = time.getMonth() + 1
      time = time.getFullYear() + '-' + month + '-' + time.getDate() + '' +
        time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
      return time
    },
    handleTime1(time) {
      time = new Date(time)
      const month = time.getMonth() + 1
      time = time.getFullYear() + '-' + month + '-' + time.getDate()
      return time
    },
    handleTime2(time) {
      time = new Date(time)
      time = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
      return time
    },
    searchByName() {
    },
    getAutoHeight() {
      const el = document.querySelector('#tableData')
      const pt = this.getStyle(el, 'paddingTop')
      const pb = this.getStyle(el, 'paddingBottom')
      // 一定要使用 nextTick 来改变height 不然不会起作用
      this.$nextTick(() => {
        const totalHeight = el.clientHeight - (pt + pb)
        this.pageSize = Math.floor((totalHeight - 71) / 90)
        // console.log(totalHeight + ' ' + singleHeight + ' ' + this.pageSize)
        this.getList(this.currentPage, this.pageSize)
      })
    },
    getStyle(obj, attr) {
      // 兼容IE浏览器
      const result = obj.currentStyle
        ? obj.currentStyle[attr].replace('px', '')
        : document.defaultView
          .getComputedStyle(obj, null)[attr].replace('px', '')
      return Number(result)
    },
    /**
     * 防抖
     */
    vueDebounce() {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        this.getAutoHeight()
      }, 500)
    },
    goToChart(treeId) {
      this.$router.push({ path: '/detail/charts' })
    },
    sortChangeHandle(ls) {
      const fieldName = ls.column.label
      const sortingType = ls.column.order
      const key = this.dict[fieldName]
      this.listLoading = true
      if (sortingType === 'ascending') {
        getTreeListSorted({
          page: this.currentPage - 1,
          size: this.pageSize,
          keys: key,
          asc: 1
        }).then(data => {
          console.log(JSON.stringify(data))
          this.list = data.list
          this.listLoading = false
        }).catch(err => {
          console.log(err)
        })
      } else if (sortingType === 'descending') {
        getTreeListSorted({
          page: this.currentPage - 1,
          size: this.pageSize,
          keys: key,
          asc: 0
        }).then(data => {
          console.log(JSON.stringify(data))
          this.list = data.list
          this.listLoading = false
        }).catch(err => {
          console.log(err)
        })
      } else {
        getTreeListData({ page: this.currentPage - 1, size: this.pageSize })
          .then(data => {
            this.list = data.list
            this.listLoading = false
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }

}
</script>

<style scoped>

.search-button{
  margin-left: 5px;
}
</style>
