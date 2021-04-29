<template>
  <div class="app-container">

    <div class="tab-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-row :gutter="24" class="search">
            <el-col :xs="6" :sm="5" :md="4" :lg="4" :xl="3">
              <el-select v-model="searchCondition" placeholder="请选择搜索条件" class="search-content">
                <el-option
                  v-for="item in conditionOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :xs="8" :sm="7" :md="6" :lg="5" :xl="4">
              <el-input
                v-model="inputSearchName"
                placeholder="请输入想要搜索的内容"
                class="search-content"
                @keyup.enter.native="searchByName"
              />
            </el-col>
            <el-col :xs="8" :sm="9" :md="8" :lg="8" :xl="8" class="search-button">
              <el-button type="primary" icon="el-icon-search" @click="searchByName"> 搜索</el-button>
              <el-button type="info" icon="el-icon-delete" @click="cleanSearch"> 清除搜索 </el-button>
            </el-col>
          </el-row>
        </div>
        <div class="card-body-right">
          <el-table
            id="tableData"
            v-loading="listLoading"
            :data="list"
            :height="height"
            :row-style="{height: '90px'}"
            fit
            highlight-current-row
            style="width: 100%;"

            @sort-change="sortChangeHandle"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand" label-width="100px">

                  <el-row :gutter="24">
                    <el-col :span="6">
                      <el-form-item label="俗名">
                        <span>{{ props.row.alias || '-' }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="拉丁名">
                        <span>{{ props.row.latinName || '-' }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <el-form-item label="平均冠幅">
                        <span>{{ props.row.crownWidthAverage || '-' }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="东西冠幅">
                        <span>{{ props.row.crownWidthEW || '-' }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="南北冠幅">
                        <span>{{ props.row.crownWidthNS || '-' }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <el-form-item label="海拔">
                        <span>{{ props.row.altitude || '-' }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="坡向">
                        <span>{{ props.row.aspect || '-' }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="坡度">
                        <span>{{ props.row.slope || '-' }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="坡位">
                        <span>{{ props.row.slopePosition || '-' }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <el-form-item label="土壤类型">
                        <span>{{ props.row.soilType || '-' }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="生长势">
                        <span>{{ props.row.crownWidthNS || '-' }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="生长环境">
                        <span>{{ props.row.env || '-' }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="环境影响因素">
                        <span>{{ props.row.crownWidthNS || '-' }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <el-form-item label="管护单位">
                        <span>{{ props.row.management || '-' }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="管护人">
                        <span>{{ props.row.guardian || '-' }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="奇特性">
                        <span>{{ props.row.peculiarDetail || '-' }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="保护现状">
                        <span>{{ props.row.protectionStatus || '-' }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="复壮现状">
                        <span>{{ props.row.conserveStatus || '-' }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="详细描述">
                    <span>{{ props.row.detailInfo || '-' }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column id="tableDataItem" label="古树编号" align="center" min-width="120" sortable="custom">
              <template slot-scope="scope">
                <span>{{ scope.row.treeId || '-' }}</span>
              </template>
            </el-table-column>

            <el-table-column label="调查顺序号" align="center" min-width="110px" sortable="custom">
              <template slot-scope="scope">
                <span>{{ scope.row.surveyNumber || '-' }}</span>
              </template>
            </el-table-column>

            <el-table-column label="中文名" align="center" min-width="110px" sortable="custom">
              <template slot-scope="scope">
                <span>{{ scope.row.chineseName || '-' }}</span>
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
              </template>
            </el-table-column>

            <el-table-column label="树高 / 胸围" align="center" min-width="115px" sortable="custom">
              <template slot-scope="scope">
                <span>{{ scope.row.height ? scope.row.height + '米' : '-' }} <br>{{ scope.row.breastDiameter ? scope.row.breastDiameter + '厘米' : '-' }}  </span>
              </template>
            </el-table-column>

            <el-table-column label="更新时间" align="center" min-width="110px" sortable="custom">
              <template slot-scope="scope">
                <span>{{ handleTime1(scope.row.updateTime) }} <br> {{ handleTime2(scope.row.updateTime) }}</span>
              </template>
            </el-table-column>

            <el-table-column label="查看图表" fixed="right" align="center" width="110px">
              <template slot-scope="scope">
                <a style="color: #409EFF" @click="goToChart(scope.row.treeId)">图表</a>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" align="center" width="110px" :v-if="show">
              <template slot-scope="scope">
                <el-button type="info" icon="el-icon-edit" circle @click="modify(scope.row.treeId)" />
                <el-button v-if="show" type="danger" icon="el-icon-delete" circle @click="deleteTree(scope.row.treeId)" />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
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
import { getTreeListData, getTreeListSorted, getTreeListBySearch, deleteTree } from '@/api/tree'
import { handleTimeYMD, handleTimeHMS } from '@/utils/commonUtil'
import store from '@/store'
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
      },
      conditionOptions: [
        {
          value: 'treeId',
          label: '古树编号'
        }, {
          value: 'surveyNumber',
          label: '调查顺序号'
        }, {
          value: 'chineseName',
          label: '中文名'
        }, {
          value: 'alias',
          label: '俗名'
        }, {
          value: 'latinName',
          label: '拉丁名'
        }, {
          value: 'family',
          label: '科-属-种'
        }, {
          value: 'location',
          label: '所在位置'
        }
      ],
      searchCondition: '',
      show: false

    }
  },
  computed: {
    roles() {
      return store.getters.roles
    }

  },
  watch: {
    roles: function(val) {
      console.log(val)
      this.show = !!(val && val.length > 0 && (val.includes('superManager') || val.includes('manager')))
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

    handleCurrentChangePage(currentPage) {
      this.getList(currentPage, this.pageSize)
    },
    handleTime1(time) {
      return handleTimeYMD(time)
    },
    handleTime2(time) {
      return handleTimeHMS(time)
    },
    searchByName() {
      if (this.searchCondition !== '' && this.inputSearchName !== '') {
        this.listLoading = true
        getTreeListBySearch({
          condition: this.searchCondition,
          value: this.inputSearchName,
          page: this.currentPage - 1,
          size: this.pageSize
        }).then(data => {
          this.list = data.list
          this.total = data.total
          this.listLoading = false
        }).catch(err => {
          console.log(err)
          this.listLoading = false
        })
      }
    },
    /**
     * 清除搜索内容，重新生成表格
     **/
    cleanSearch() {
      this.inputSearchName = ''
      this.listLoading = true
      this.getList(this.currentPage, this.pageSize)
    },
    getAutoHeight() {
      const el = document.querySelector('#tableData')
      const pt = this.getStyle(el, 'paddingTop')
      const pb = this.getStyle(el, 'paddingBottom')
      // 一定要使用 nextTick 来改变height 不然不会起作用
      this.$nextTick(() => {
        const totalHeight = el.clientHeight - (pt + pb)
        this.pageSize = Math.ceil((totalHeight - 71) / 90)
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
     * 节流防抖
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
      this.$router.push({ path: '/detail_info/charts' })
    },
    /**
     * 排序处理
     * @param ls
     */
    sortChangeHandle(ls) {
      // 要排序的中文字段名
      const fieldName = ls.column.label
      // 排序顺序
      const sortingType = ls.column.order
      // 中文字段名对应的表字段名
      const key = this.dict[fieldName]
      this.listLoading = true
      // 正序排，asc值置为1，逆序排置为0
      if (sortingType === 'ascending') {
        getTreeListSorted({
          page: this.currentPage - 1,
          size: this.pageSize,
          keys: key,
          asc: 1
        }).then(data => {
          this.list = data.list
          this.listLoading = false
        }).catch(err => {
          console.log(err)
        })
        // 逆序排
      } else if (sortingType === 'descending') {
        getTreeListSorted({
          page: this.currentPage - 1,
          size: this.pageSize,
          keys: key,
          asc: 0
        }).then(data => {
          this.list = data.list
          this.listLoading = false
        }).catch(err => {
          console.log(err)
        })
      } else {
        // 取消排序
        getTreeListData({ page: this.currentPage - 1, size: this.pageSize })
          .then(data => {
            this.list = data.list
            this.listLoading = false
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    modify(treeId) {
      this.$router.push({ path: '/detail_info/charts' })
    },
    deleteTree(treeId) {
      deleteTree(treeId)
        .then(data => {
          this.$message.success('删除成功!')
          // 刷新表格
          getTreeListData({ page: this.currentPage - 1, size: this.pageSize })
            .then(data => {
              this.list = data.list
              this.listLoading = false
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          this.$message.error('删除失败' + err)
        })
    }

  }

}
</script>

<style scoped>

.search-button{
  margin-left: 5px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  width: 500px;
}

</style>
