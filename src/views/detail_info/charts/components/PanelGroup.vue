<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="current" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <el-tooltip class="item" effect="dark" content="点击下拉框选取节点" placement="bottom" align="right">
            <div class="card-panel-text">
              当前树木编号
            </div>
          </el-tooltip>
          <div class="grid-content bg-purple-light" style="margin-right: -15px">
            <el-input v-model="inputTreeId" placeholder="请输入树木编号" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" class="input-with-select-icon" @click="searchById" />
            </el-input>
          </div>
        </div>
      </div></el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="nodenums" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <el-tooltip class="item" effect="dark" content="点击下拉框选取节点" placement="bottom" align="right">
            <div class="card-panel-text">
              当前树木节点 IMSI
            </div>
          </el-tooltip>
          <div class="node-description" align="center" style="color:#0089F0">{{ imsi }}</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="node" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            节点连接成功率
          </div>
          <div class="node-description" align="center" style="color:#337AB7">{{ nodeConnectRate || 100 }} %</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="server" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            服务器连接状态
          </div>
          <el-row class="server-description">
            <el-col :span="2">
              <div class="grid-content bg-purple">
                <div :class="connectIcon" :style="{color: color}" />
              </div>
            </el-col>
            <el-col :span="22" style="padding-left: 20px">
              <div class="grid-content bg-purple-light" :style="{color: color}"> {{ connectText }}</div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>

export default {
  props: {
    imsi: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      inputTreeId: ''
    }
  },
  computed: {
    connectIcon: function() {
      // const status = this.$store.getters.wsConnectStatus
      const status = 'connectSuccess'
      switch (status) {
        case 'connecting':
          return 'el-icon-loading'
        case 'connectSuccess':
          return 'iconfont icon-lianjiechenggong'
        case 'connectFail':

          return 'iconfont icon-lianjieshibai'
      }
      return 'el-icon-loading'
    },
    connectText: function() {
      // const status = this.$store.getters.wsConnectStatus
      const status = 'connectSuccess'
      switch (status) {
        case 'connecting':
          return '正在连接'
        case 'connectSuccess':
          return '连接成功'
        case 'connectFail':
          return '连接失败'
      }
      return '正在连接'
    },
    color: function() {
      // const status = this.$store.getters.wsConnectStatus
      const status = 'connectSuccess'
      switch (status) {
        case 'connecting':
          return '#40c9c6'
        case 'connectSuccess':
          return '#40c9c6'
        case 'connectFail':
          return '#DC143C'
      }
      return '正在连接'
    },
    nodeConnectRate: function() {
      return 100
    }

  },
  created() {

  },
  mounted() {

  },
  methods: {
    searchById() {
      this.$emit('panelImsiChange', this.inputTreeId)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }

      .server-description {
        font-size: 15px;
        padding: 11px;
      }

      .node-description {
        font-size: 18px;
        padding: 11px;
        .el-dropdown-link {
          cursor: pointer;
          color: #40c9c6;
        }
        .el-icon-arrow-down {
          font-size: 9px;
        }
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}

@font-face {
  font-family: "iconfont";
  src: url('//at.alicdn.com/t/font_2226861_abk08h79b2q.eot?t=1606231610664'); /* IE9 */
  src: url('//at.alicdn.com/t/font_2226861_abk08h79b2q.eot?t=1606231610664#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAOYAAsAAAAAB5gAAANKAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDBgqCbIJUATYCJAMMCwgABCAFhG0HShuuBsgekiQlUhJCQAIAAAPFw9dYe3937xzRBkk0QvbpJNGIh+aVBA1CoxIaQycUhu4l3KQuVZinvygZgScgMGR7lG39sywHUB9uOwLxSDQHgKeOnVuA/wfHkr9CIA/oXbIDH/D5gR4oKrbRyDaQCfoesA3w9us6gaZRGXzWaps5EKww5wXiHMtGEJzRKg2FoS5UK7YW8aCinu7SOwDug9+Pf5AXwSSVzLxp/bDGAsq/as5m/G47wF5mbqczg99FxhygEAeV1i1+UXSOn6Yq9W/OrCpCmirwPxBwNXHV+odHEkSVmd8GUxRLfNU43EQ2g/yrviqDKmo4BjwzyYNOzUp/fER4X3j4xdpFjuPF5fWOxZX28Kh1L11Y6Vxa7xIFboXx31YvrZcJT1mvxbdfSdCuJnVdT+wZXDnhVk/59XNx7azv4hrhvev4S6t4tvKk3nLl4qtbSfL1py9vWoRr3teXEvir7MXFwj9pW9yZvYWxqirGpq77/d31e9rMTO8Sz4SP2g2/j3d+j8f5Uq77jBNnlHSVxDPyM5W9fZqWL4qHh0irFsSjQwAz+whIhgEbFstL2/Tf8IfQFW3gsojLL933KwaHKu99qLw/OBgP/XCvYmiw4v6HintDQ1D+Kj8186WuJuy2v+pndZih4M6zVzpe9+ru09cwGRgAdPhHvuHs8u1f9DfeQlMe6KOK/wWHFfB5XFeI3O61t6hL8Lw/pKkAOv1DEJi6XBSuwzVs2ULKLYFsQeZvKIZ+e8OVQw8dD3VDCSQ1I5DVjSEKZg4qWuahqm4RmmbV7W4ZQPiJ0sCMSYDQ6z0k3V4h6zWLKJhdqBj2F6p6ww+aNiLuyJaJwKFVBBkpskBTP8Rml1OyDTQ0LOxEsmY3krQgoAiIqDgAc7Ny8ok65ERkihVqj5xHqQQl4nLAWrgN2e0u6CYuKzLTLIVSd2F2tlT1TVlmlwOEWkUgRhRiAZn0gzAzFyfJ602FFn6+EyLT2BmRho4qswAhVHhwKFeWnA6IOqmzU8etfEXVQ5aHoiSQhHBxgGrBjNitqAvkrp5khZhRWZQBYbdC2dRN6irNWl7ueL990GTemiNFjqLrHBudVoxUBZuMODqTalaQU5ZdjgYAAAA=') format('woff2'),
  url('//at.alicdn.com/t/font_2226861_abk08h79b2q.woff?t=1606231610664') format('woff'),
  url('//at.alicdn.com/t/font_2226861_abk08h79b2q.ttf?t=1606231610664') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_2226861_abk08h79b2q.svg?t=1606231610664#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-lianjieshibai:before {
  content: "\e688";
}

.icon-lianjiechenggong:before {
  content: "\e645";
}
.input-with-select{
  width: 190px;
}
.input-with-select-icon{
  width: 20px;
  margin-left: -27px;
  margin-right: -25px;
}

</style>
