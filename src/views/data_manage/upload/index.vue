<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="150px">

        <el-divider content-position="center" class="divide-top"><strong>基本信息</strong></el-divider>

        <el-row :gutter="24" class="row-bg">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="古树编号">
              <el-input
                v-model="form.treeId"
                class="input-s"
                type="text"
                placeholder="请填写古树编号"
                @change="saveTreeId"
                @keyup.enter.native="getTreeInfoByTreeId"
              >
                <el-button slot="append" icon="el-icon-search" @click="getTreeInfoByTreeId" />
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="调查顺序号">
              <el-input v-model="form.surveyNumber" type="text" placeholder="请填写调查顺序号" class="input-s" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" />
        </el-row>

        <el-divider content-position="center" class="divide"><strong>树种信息</strong></el-divider>

        <el-row :gutter="24" class="row-bg">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="中文名">
              <el-input v-model="form.chineseName" type="text" placeholder="请填写树木中文名" class="input-s" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="俗名">
              <el-input v-model="form.alias" type="text" placeholder="请填写树木俗名" class="input-s" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="拉丁名">
              <el-input v-model="form.latinName" type="text" placeholder="请填写树木拉丁名" class="input-s" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="科">
              <el-input v-model="form.family" type="text" placeholder="请填写树木的科" class="input-s" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="属">
              <el-input v-model="form.genus" type="text" placeholder="请填写树木的属" class="input-s" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="种">
              <el-input v-model="form.species" type="text" placeholder="请填写树木的种" class="input-s" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider content-position="center" class="divide"><strong>地址信息</strong></el-divider>

        <el-row :gutter="24" class="row-bg">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="省市区/县">
              <el-cascader
                v-model="selectedLocations"
                size="large"
                :options="locations"
                @change="handleLocationChange"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="详细地址">
              <el-input v-model="form.locationDetail" type="text" placeholder="请填写树木详细地址" class="input-s" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="经纬坐标">
              <el-input
                v-model="form.map"
                type="text"
                :select-open="locationShow"
                placeholder="点击获取当前坐标（经度,纬度）"
                @click="locationShow = true; getLocation()"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider content-position="center" class="divide"><strong>等级及权属</strong></el-divider>

        <el-row :gutter="24" class="row-bg">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="树木等级">
              <el-radio v-model="form.grade" label="国家一级古树">国家一级古树</el-radio>
              <el-radio v-model="form.grade" label="国家二级古树">国家二级古树</el-radio>
              <el-radio v-model="form.grade" label="国家三级古树">国家三级古树</el-radio>
              <el-radio v-model="form.grade" label="名木">名木</el-radio>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="权属">
              <el-radio v-model="form.ownerShip" label="国有">国有</el-radio>
              <el-radio v-model="form.ownerShip" label="集体">集体</el-radio>
              <el-radio v-model="form.ownerShip" label="个人">个人</el-radio>
              <el-radio v-model="form.ownerShip" label="其他">其他</el-radio>
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider content-position="center" class="divide"><strong>生长信息</strong></el-divider>

        <el-row :gutter="24" class="row-bg">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="生长场所">
              <el-radio v-model="form.growthPlace" label="乡村">乡村</el-radio>
              <el-radio v-model="form.growthPlace" label="城区">城区</el-radio>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="分布特点">
              <el-radio v-model="form.distCH" label="散生">散生</el-radio>
              <el-radio v-model="form.distCH" label="群状">群状</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="row-bg">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="树 龄">
              <el-input v-model="form.age" type="text" placeholder="请填写树龄" class="input-s" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="树 高">
              <el-input v-model="form.treeHeight" type="text" placeholder="请填写树高/cm" class="input-s" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="胸 围">
              <el-input v-model="form.breastDiameter" type="text" placeholder="请填写胸径/cm" class="input-s" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24" class="row-bg">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="平均冠幅">
              <el-input v-model="form.crownWidthAverage" type="text" placeholder="请填写平均冠幅/cm" class="input-s" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="冠幅(东西)">
              <el-input v-model="form.crownWidthEW" type="text" placeholder="请填写冠幅(东西)" class="input-s" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="冠幅(南北)">
              <el-input v-model="form.crownWidthNS" type="text" placeholder="请填写冠幅(东西)" class="input-s" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider content-position="center" class="divide"><strong>立地条件</strong></el-divider>

        <el-row :gutter="24" class="row-bg">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="坡向">
              <el-input v-model="form.aspect" type="text" placeholder="请填写坡向" class="input-s" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="坡度">
              <el-input v-model="form.slope" type="text" placeholder="请填写坡度" class="input-s" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="坡位">
              <el-input v-model="form.slopePosition" type="text" placeholder="请填写坡位" class="input-s" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="row-bg">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="海拔">
              <el-input v-model="form.altitude" type="text" placeholder="请填写海拔" class="input-s" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="土壤类型">
              <el-input v-model="form.soilType" type="text" placeholder="请填写冠幅(东西)/cm" class="input-s" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider content-position="center" class="divide"><strong>生长势及环境</strong></el-divider>

        <el-row :gutter="24" class="row-bg">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="生长势">
              <el-radio v-model="form.growthVigor" label="正常">正常</el-radio>
              <el-radio v-model="form.growthVigor" label="衰弱">衰弱</el-radio>
              <el-radio v-model="form.growthVigor" label="濒危">濒危</el-radio>
              <el-radio v-model="form.growthVigor" label="死亡">死亡</el-radio>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="生长环境">
              <el-radio v-model="form.env" label="好">好</el-radio>
              <el-radio v-model="form.env" label="中">中</el-radio>
              <el-radio v-model="form.env" label="差">差</el-radio>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="影响生长环境因素">
              <el-input
                v-model="form.envFactor"
                type="textarea"
                :autosize="{ minRows: 2}"
                placeholder="请填写影响树木生长环境的因素"
                class="input-s"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider content-position="center" class="divide"><strong>管护信息</strong></el-divider>

        <el-row :gutter="24" class="row-bg">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="管护单位">
              <el-input v-model="form.management" type="text" placeholder="请填写管护单位（选填）" class="input-s" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="管护人">
              <el-input v-model="form.guardian" type="text" placeholder="请填写管护人" class="input-s" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider content-position="center" class="divide"><strong>树木现状</strong></el-divider>

        <el-row :gutter="24" class="row-bg">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="保护现状">
              <el-checkbox-group v-model="form.protectionStatus" border="true" size="mini">
                <el-checkbox label="避雷针" style="width: 90px">避雷针</el-checkbox>
                <el-checkbox label="护栏" style="width: 90px">护栏</el-checkbox>
                <el-checkbox label="支撑" style="width: 90px">支撑</el-checkbox>
                <el-checkbox label="封堵树洞" style="width: 90px">封堵树洞</el-checkbox>
                <el-checkbox label="砌树池" style="width: 90px">砌树池</el-checkbox>
                <el-checkbox label="包树箍" style="width: 90px">包树箍</el-checkbox>
                <el-checkbox label="树池透气铺装" style="width: 90px">树池透气铺装</el-checkbox>
                <el-checkbox label="其他" style="width: 90px">其他</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="养护复壮现状">
              <el-checkbox-group v-model="form.conserveStatus">
                <el-checkbox label="复壮沟" style="width: 90px">复壮沟</el-checkbox>
                <el-checkbox label="渗井" style="width: 90px">渗井</el-checkbox>
                <el-checkbox label="透气管" style="width: 90px">透气管</el-checkbox>
                <el-checkbox label="幼树靠接" style="width: 90px">幼树靠接洞</el-checkbox>
                <el-checkbox label="土壤改良" style="width: 90px">土壤改良</el-checkbox>
                <el-checkbox label="叶面施肥" style="width: 90px">叶面施肥</el-checkbox>
                <el-checkbox label="其他" style="width: 90px">其他</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider content-position="center" class="divide"><strong>其他信息</strong></el-divider>

        <el-row :gutter="24" class="row-bg">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="树木图片" class="input-s">
              <el-upload
                class="upload-demo"
                action=""
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                list-type="picture"
                :http-request="uploadPic"
                accept="image/jpeg,image/png,image/jpg"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="图片说明">
              <el-input
                v-model="form.detailInfo"
                type="textarea"
                :autosize="{ minRows: 18}"
                placeholder="请填写图片说明"
                class="input-s"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-form-item label="奇特性描述">
              <el-input
                v-model="form.peculiarDetail"
                type="textarea"
                :autosize="{ minRows: 18}"
                placeholder="请描述树木的奇特性"
                class="input-s"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <div style="text-align:center;">
          <el-button style="width: 100px" type="primary" @click="saveTreeInfos">保存</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>

import Cookies from 'js-cookie'
import { regionData, CodeToText, TextToCode } from 'element-china-area-data'
import { getTreePics, getTreePicsUploadUrl, saveTreeInfo, getTreeById } from '@/api/tree.js'
import { uploadPic, deletePicByName } from '@/api/picture'
import { getUsername } from '@/utils/auth'
const updateIdKey = 'vue_update_id'
export default {
  data() {
    return {
      userId: '',
      locations: regionData,
      selectedLocations: [],
      form: {
        treeId: '',
        surveyNumber: '',
        chineseName: '',
        alias: '',
        latinName: '',
        family: '',
        genus: '',
        species: '',
        region: '',
        locationDetail: '',
        map: '',
        growthPlace: '',
        distCH: '',
        ownerShip: '',
        age: '',
        grade: '',
        treeHeight: '',
        breastDiameter: '',
        crownWidthAverage: '',
        crownWidthEW: '',
        crownWidthNS: '',
        altitude: '',
        aspect: '',
        slope: '',
        slopePosition: '',
        soilType: '',
        growthVigor: '',
        env: '',
        envFactor: '',
        management: '',
        guardian: '',
        peculiarDetail: '',
        protectionStatus: [],
        conserveStatus: [],
        detailInfo: '',
        longitude: '',
        latitude: '',
        locationProvince: '',
        locationCity: '',
        locationDistrict: ''
      },

      actionSheetShow: false,
      pickerShow: false,
      locationShow: false,
      height: 120,
      autoHeight: true,
      uploadUrl: getTreePicsUploadUrl(),
      fileList: [
      ]
    }
  },
  created() {
    this.form.treeId = Cookies.get(updateIdKey) || 13
    if (this.form.treeId) {
      this.getTreeInfoByTreeId()
    }
    console.log(this.uploadUrl)
  },
  methods: {
    saveTreeId() {
      Cookies.remove(updateIdKey)
      Cookies.set(updateIdKey, this.form.treeId)
    },
    uploadPic(param) {
      const formData = new FormData()
      formData.append('file', param.file)
      uploadPic(getUsername(), this.treeId, formData).then(response => {
        console.log('上传图片成功')
        param.onSuccess() // 上传成功的图片会显示绿色的对勾
        // 但是我们上传成功了图片， fileList 里面的值却没有改变，还好有on-change指令可以使用
      }).catch(response => {
        console.log('图片上传失败')
        param.onError()
      })
    },
    getTreePictures() {
      getTreePics({
        treeId: this.form.treeId
      })
        .then(data => {
          console.log(data)
          this.fileList = data
          // for (let i = 0; i < data.length; i++) {
          //   this.fileList.push({
          //     name: data[i],
          //     url: data[i]
          //   })
          // }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getTreeInfoByTreeId() {
      getTreeById({ treeId: this.form.treeId })
        .then(data => {
          // 特殊数据处理
          this.handleLocationReverse(data)
          this.form.map = (data.longitude && data.latitude) && data.longitude + ', ' + data.latitude || ''

          this.form.treeId = data.treeId
          this.form.surveyNumber = data.surveyNumber
          this.form.chineseName = data.chineseName
          this.form.alias = data.alias
          this.form.latinName = data.latinName
          this.form.family = data.family
          this.form.genus = data.genus
          this.form.species = data.species

          this.form.locationDetail = data.locationDetail
          this.form.longitude = data.longitude
          this.form.latitude = data.latitude
          this.form.growthPlace = data.growthPlace
          this.form.distCH = data.distCH
          this.form.ownerShip = data.ownerShip
          this.form.age = data.age
          this.form.grade = data.grade
          this.form.treeHeight = data.height
          this.form.breastDiameter = data.breastDiameter
          this.form.crownWidthAverage = data.crownWidthAverage
          this.form.crownWidthEW = data.crownWidthEW
          this.form.crownWidthNS = data.crownWidthNS
          this.form.altitude = data.altitude
          this.form.aspect = data.aspect
          this.form.slope = data.slope
          this.form.slopePosition = data.slopePosition
          this.form.soilType = data.soilType
          this.form.growthVigor = data.growthVigor
          this.form.env = data.env
          this.form.envFactor = data.envFactor
          this.form.management = data.management
          this.form.guardian = data.guardian
          this.form.peculiarDetail = data.peculiarDetail
          this.form.protectionStatus = data.protectionStatus && data.protectionStatus.split(',') || []
          this.form.conserveStatus = data.conserveStatus && data.conserveStatus.split(',') || []
          this.form.detailInfo = data.detailInfo
          this.getTreePictures()
        })
        .catch(err => {
          console.log(err)
        })
    },
    saveTreeInfos() {
      this.form.longitude = this.form.map && this.form.map.split(',')[1] || ''
      this.form.latitude = this.form.map && this.form.map.split(',')[1] || ''
      const data = {
        treeId: this.form.treeId,
        surveyNumber: this.form.surveyNumber,
        chineseName: this.form.chineseName,
        alias: this.form.alias,
        latinName: this.form.latinName,
        family: this.form.family,
        genus: this.form.genus,
        species: this.form.species,
        locationProvince: this.form.locationProvince,
        locationCity: this.form.locationCity,
        locationDistrict: this.form.locationDistrict,
        locationDetail: this.form.locationDetail,
        longitude: this.form.longitude,
        latitude: this.form.latitude,
        growthPlace: this.form.growthPlace,
        distCH: this.form.distCH,
        ownerShip: this.form.ownerShip,
        age: this.form.age,
        grade: this.form.grade,
        height: this.form.treeHeight,
        breastDiameter: this.form.breastDiameter,
        crownWidthAverage: this.form.crownWidthAverage,
        crownWidthEW: this.form.crownWidthEW,
        crownWidthNS: this.form.crownWidthNS,
        altitude: this.form.altitude,
        aspect: this.form.aspect,
        slope: this.form.slope,
        slopePosition: this.form.slopePosition,
        soilType: this.form.soilType,
        growthVigor: this.form.growthVigor,
        env: this.form.env,
        envFactor: this.form.envFactor,
        management: this.form.management,
        guardian: this.form.guardian,
        peculiarDetail: this.form.peculiarDetail,
        protectionStatus: this.form.protectionStatus.join(','),
        conserveStatus: this.form.conserveStatus.join(','),
        detailInfo: this.form.detailInfo,
        declarerId: this.userId
      }
      saveTreeInfo(getUsername(), data)
        .then(data => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
          this.$refs.uToast.show({
            title: '上传数据失败',
            type: 'error'
          })
        })
    },
    handleLocationChange() {
      this.form.locationProvince = CodeToText[this.selectedLocations[0]]
      this.form.locationCity = CodeToText[this.selectedLocations[1]]
      this.form.locationDistrict = CodeToText[this.selectedLocations[2]]
    },
    handleLocationReverse(data) {
      const list = []
      const province = data.locationProvince
      const city = data.locationCity
      const dis = data.locationDistrict
      if (province && city && dis) {
        const pr = TextToCode[province]
        list.push(pr.code)
        list.push(pr[city].code)
        list.push(pr[city][dis].code)
        this.form.locationProvince = province
        this.form.locationCity = city
        this.form.locationDistrict = dis
      }
      this.selectedLocations = list
    },
    handlePreview(file) {
      // this.getTreePictures()
    },
    handleRemove(file, fileList) {
      console.log(fileList)
      deletePicByName(getUsername(), this.form.treeId, file.name)
        .then(data => {
          console.log(data)
          this.getTreePictures()
        })
        .catch(err => {
          console.log(err)
          this.getTreePictures()
        })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.divide{
  margin-top: 40px;
  height: 2px;
}
.divide-top{
  height: 2px;
}
.row-bg{
  margin-top: 40px;
}
.input-s{
  padding-right: 40px;
}
.search-button{
  padding-right: 40px;
}
</style>

