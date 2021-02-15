<template>
  <div class="dashboard-container">
    <dv-border-box-12>
      <el-row :gutter="20" style="padding-top: 30px">
        <el-col :span="6">
          <div style="height:300px">
            <dv-border-box-9 style="margin-left: 10px">
              <dv-charts :option="gradeOption" />
            </dv-border-box-9>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">s</div>
        </el-col>
        <!--        <el-col :span="4"><div class="grid-content bg-purple">s</div></el-col>-->
      </el-row>
    </dv-border-box-12>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      gradeOption: '',
      gradeData: ''
    }
  },
  created() {
    this.getGradeData()
    this.showGradePie()
  },
  methods: {
    getGradeData() {
      this.gradeData
    },
    showGradePie() {
      this.gradeOption = {
        title: {
          text: '树木等级占比饼状图',
          style: {
            fill: '#32c5e9'
          }
        },
        series: [
          {
            type: 'pie',
            data: [
              { name: '国家一级古树', value: 93 },
              { name: '国家二级古树', value: 32 },
              { name: '国家三级古树', value: 65 },
              { name: '名木', value: 44 }
            ],
            insideLabel: {
              show: true,
              style: {
                fontSize: 12,
                fill: '#000',
                textAlign: 'center',
                textBaseline: 'middle'
              }
            },
            outsideLabel: {
              show: true
            },
            animationCurve: 'easeOutCubic'

          }
        ]
      }
    }

  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    height: 95.5vh;
    background-color: #1f2d3d;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

</style>
