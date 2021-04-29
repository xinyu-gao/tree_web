<template>
  <div class="app-container">

    <el-row :gutter="24" class="search">
      <el-col :xs="8" :sm="7" :md="6" :lg="5" :xl="4">
        <el-input v-model="inputSearchName" placeholder="请输入想要搜索的古树编号" />
      </el-col>
      <el-col :xs="15" :sm="16" :md="17" :lg="18" :xl="4" class="search-button">
        <el-button type="primary" icon="el-icon-search" @click="searchByName"> 搜索</el-button>
      </el-col>
    </el-row>

    <el-row :gutter="10" style="margin-top:3vh">
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-card class="box-card">
          <el-divider content-position="center">调查信息</el-divider>
          <div class="text item">
            <strong>古树编号：</strong>{{ item.treeId || '-' }}
          </div>
          <div class="text item">
            <strong>调查顺序号： </strong>{{ item.surveyNumber || '-' }}
          </div>
          <el-divider content-position="center">树种信息</el-divider>
          <div class="text item">
            <strong>中文名： </strong>{{ item.chineseName || '暂无' }}
          </div>
          <div class="text item">
            <strong>俗名： </strong>{{ item.alias || '暂无' }}
          </div>
          <div class="text item">
            <strong>拉丁名： </strong>{{ item.latinName || '暂无' }}
          </div>
          <div class="text item">
            <strong>科： </strong> {{ item.family || '暂无' }}
          </div>
          <div class="text item">
            <strong>属： </strong> {{ item.genus || '暂无' }}
          </div>
          <div class="text item">
            <strong>种： </strong> {{ item.species || '暂无' }}
          </div>
          <el-divider content-position="center">地址信息</el-divider>
          <div class="text item">
            <strong>省市区/县： </strong> {{ item.locationProvince || '暂无' }} - {{ item.locationCity || '暂无' }} - {{ item.locationDistrict || '' }}
          </div>
          <div class="text item">
            <strong>详细地址： </strong> {{ item.surveyNumber || '暂无' }}
          </div>
          <div class="text item">
            <strong>经纬坐标： </strong> {{ item.longitude && item.latitude ? item.longitude + ' ,' + item.latitude : '暂无' }}
          </div>
          <el-divider content-position="center">等级及权属</el-divider>
          <div class="text item">
            <strong>树木等级： </strong> {{ item.grade || '暂无' }}
          </div>
          <div class="text item">
            <strong>权属： </strong> {{ item.ownerShip || '暂无' }}
          </div>

          <el-divider content-position="center">生长信息</el-divider>
          <div class="text item">
            <strong>生长场所： </strong> {{ item.growthPlace || '暂无' }}
          </div>
          <div class="text item">
            <strong>分布特点： </strong> {{ item.distCH || '暂无' }}
          </div>
          <div class="text item">
            <strong>树 龄： </strong> {{ item.age ? item.age + ' 年' : '暂无' }}
          </div>
          <div class="text item">
            <strong>树 高： </strong> {{ item.treeHeight ? item.treeHeight + ' 米': '暂无' }}
          </div>
          <div class="text item">
            <strong>胸 围： </strong> {{ item.breastDiameter ? item.breastDiameter+ ' 厘米': '暂无' }}
          </div>
          <div class="text item">
            <strong>平均冠幅： </strong> {{ item.crownWidthAverage ? item.crownWidthAverage + ' 米': '暂无' }}
          </div>
          <div class="text item">
            <strong>冠幅(东西)： </strong> {{ item.crownWidthE ? item.crownWidthE + ' 米': '暂无' }}
          </div>
          <div class="text item">
            <strong>冠幅(南北)： </strong> {{ item.crownWidthNS ? item.crownWidthNS + ' 米': '暂无' }}
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-card class="box-card">
          <el-divider content-position="center">立地条件</el-divider>
          <div class="text item">
            <strong>坡向： </strong> {{ item.aspec || '暂无' }}
          </div>
          <div class="text item">
            <strong>坡度： </strong> {{ item.slope ? item.slope + ' 米' : '暂无' }}
          </div>
          <div class="text item">
            <strong>坡位： </strong> {{ item.slopePosition ? item.slopePosition + ' 部' : '暂无' }}
          </div>
          <div class="text item">
            <strong>海拔： </strong> {{ item.altitude ? item.altitude + ' 米' : '暂无' }}
          </div>
          <div class="text item">
            <strong>土壤类型： </strong> {{ item.soilType || '暂无' }}
          </div>

          <el-divider content-position="center">生长势及环境</el-divider>
          <div class="text item">
            <strong>生长势： </strong> {{ item.growthVigor || '暂无' }}
          </div>
          <div class="text item">
            <strong>生长环境： </strong> {{ item.env || '暂无' }}
          </div>
          <div class="text item text2">
            <strong>影响生长环境因素： </strong> {{ item.envFactor || '暂无' }}
          </div>

          <el-divider content-position="center">树木现状</el-divider>
          <div class="text item">
            <strong>保护现状： </strong> {{ item.protectionStatus || '暂无' }}
          </div>
          <div class="text item">
            <strong>养护复壮现状： </strong> {{ item.conserveStatus || '暂无' }}
          </div>

          <el-divider content-position="center">树木描述</el-divider>
          <div class="text item text2">
            <strong>详细描述： </strong> {{ item.detailInfo || '暂无' }}
          </div>

          <el-divider content-position="center">管护信息</el-divider>
          <div class="text item">
            <strong>管护单位： </strong> {{ item.management || '暂无（未知）' }}
          </div>
          <div class="text item">
            <strong>管护人： </strong> {{ item.guardian || '暂无（未知）' }}
          </div>

          <el-divider content-position="center">其他信息</el-divider>
          <div class="text item">
            <strong>调查员： </strong> {{ item.declarerId || '未知' }}
          </div>
          <div class="text item">
            <strong>数据更新日期： </strong> {{ handleTime(item.updateTime) || '未知' }}
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <el-card class="box-card">
          <el-divider content-position="center">图片信息</el-divider>
          <div>
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="url in picList" :key="url">
                <el-image
                  style="width: 100%; height: 100%"
                  :src="url"
                  :fit="url"
                  placeholder="加载中..."
                  :preview-src-list="picList"
                />
              </el-carousel-item>
            </el-carousel>
          </div>
          <el-divider content-position="center">节点监控信息</el-divider>
          <div class="text item">
            <strong>温度： </strong> {{ imsiInfo.temp || '-' }} °C
          </div>
          <div class="text item">
            <strong>湿度： </strong> {{ imsiInfo.humidity || '-' }} %
          </div>
          <div class="text item">
            <strong>倾斜度： </strong> {{ imsiInfo.slant || '-' }} °
          </div>
          <div class="text item">
            <strong>在线： </strong> {{ imsiInfo.online ? "在线" : "离线" || '-' }}
          </div>
          <div class="text item">
            <strong>更新时间： </strong> {{ handleTime(imsiInfo.sendTime) || '-' }}
          </div>

          <el-divider content-position="center">树木缺陷成像图</el-divider>
          <defect-chart height="300px" width="360px" class="defect" text-margin-top="25px" align="center" :defect-data="defectData" />
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { getTreeById } from '@/api/tree'
import { getNodeByIMSI, getNodeDefectInfoByIMSI } from '@/api/imsi'
import { getPicUrlById } from '@/api/picture'
import { handleTime } from '@/utils/commonUtil'
import DefectChart from '@/views/detail_info/charts/components/DefectChart'
export default {
  components: {
    DefectChart
  },
  data() {
    return {
      treeId: '13',
      imsi: '',
      item: {},
      picList: [],
      imsiInfo: {},
      defectData: '',
      inputSearchName: ''
    }
  },
  computed: {
    dataUpdate() {
      return this.$store.state.app.imsiDataUpdate
    }
  },
  watch: {
    dataUpdate: function(val) {
      this.getDefectData()
    }
  },
  mounted() {
    this.getData(this.treeId)
  },
  methods: {
    getData(id) {
      this.item = {}
      this.picList = {}
      this.imsiInfo = {}
      const treeId = this.$route.query.treeId || id
      getTreeById({ treeId: treeId })
        .then(data => {
          this.item = data
          this.imsi = data.imsi
          getNodeByIMSI({ imsi: data.imsi })
            .then(data => {
              this.imsiInfo = data
            })
            .catch(err => {
              console.log(err)
            })
          getPicUrlById({ tree_id: treeId })
            .then(data => {
              const list = []
              for (let i = 0; i < data.length; i++) {
                list.push(data[i].url)
              }
              this.picList = list
            })
          this.getDefectData()
        })
        .catch(err => {
          console.log(err)
        })
      this.$route.query.treeId = ''
    },
    getDefectData() {
      getNodeDefectInfoByIMSI({ imsi: this.imsi })
        .then(data => {
          this.defectData = data
        }).catch(err => {
          console.log(err)
        })
    },
    handleTime(time) {
      return handleTime(time)
    },

    searchByName() {
      this.getData(this.inputSearchName)
    },
    cleanSearch() {

    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  margin-left: 53px;
}

.box-card {
  width: 480px;
  min-height: 960px;
  margin-left: 25px;
}

.text2{
  min-height:80px
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.search{
  padding-left: 30px;
}
.defect{
  margin-top: 20px;
  margin-left: 40px
}
.el-carousel__item.is-animating{ transform: none!important; }
</style>
