<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">登录</h3>
        <a :style="{color:userLoginColor}" @click="handleChangeUser">账号登录</a>
        <a :style="{color:emailLoginColor}" class="email" @click="handleChangeEmail">邮箱登录</a>
      </div>
      <div v-if="loginForUsername">
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="用户名"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </div>

      <div v-if="loginForEmail">
        <el-form-item prop="Email">
          <span class="svg-container">
            <svg-icon icon-class="email" />
          </span>
          <el-input
            ref="email"
            v-model="loginForm2.email"
            placeholder="请填写您的账户邮箱"
            name="email"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="code">
          <span class="svg-container">
            <svg-icon icon-class="validateCode" />
          </span>
          <el-input
            ref="code"
            v-model="loginForm2.code"
            :type="codeType"
            placeholder="请输入验证码"
            name="code"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span v-show="show" class="show-pwd" @click="getEmailValidateCode">获取验证码</span>
          <span v-show="!show" class="show-pwd">请{{ showTimeCount }}s后再试</span>
        </el-form-item>
      </div>

      <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">登录</el-button>
      <div style="margin-top: 40px">
        <span style="color: #fff; ">第三方登录：</span>
        <a target="_blank" :href="linkToAliPay"><svg-icon icon-class="alipay" class="alipay-icon" /></a>
      </div>
    </el-form>

  </div>
</template>

<script>
import { generateUUID } from '@/utils/commonUtil'
import { getUsername, removeToken, setToken, setUsername } from '@/utils/auth'
export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不得少于6个字符'))
      } else {
        callback()
      }
    }
    return {
      userLoginColor: '#fff',
      emailLoginColor: '#A0A2A6',
      alipayLoginColor: '#A0A2A6',
      loginForm: {
        username: 'sss',
        password: 'ssssss'
      },
      loginForm2: {
        email: '',
        code: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      codeType: '',
      redirect: undefined,
      loginForUsername: true,
      loginForEmail: false,
      show: true,
      sum: '',
      timer: null,
      websocket: null,
      wsId: ''
    }
  },
  computed: {
    showTimeCount: function() {
      return this.sum
    },
    linkToAliPay: function() {
      return process.env.VUE_APP_IP + '/oauth/render/' + this.wsId
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.wsId = generateUUID()
    this.initWebSocket(this.wsId)
    console.log('---', this.linkToAliPay)
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$notify({
                title: '登陆成功',
                type: 'success'
              })
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            }).catch((err) => {
              if (err === '密码不正确') {
                this.$notify({
                  title: '密码不正确',
                  type: 'failed'
                })
              }
              console.log(err)
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleChangeEmail() {
      this.loginForUsername = false
      this.loginForEmail = true
      this.userLoginColor = '#A0A2A6'
      this.emailLoginColor = '#fff'
    },
    handleChangeUser() {
      this.loginForUsername = true
      this.loginForEmail = false
      this.userLoginColor = '#fff'
      this.emailLoginColor = '#A0A2A6'
    },
    getEmailValidateCode() {
      this.timeCal()
    },
    timeCal() {
      const time_count = 60
      if (!this.timer) {
        this.sum = time_count
        this.show = false
        this.timer = setInterval(() => {
          if (this.sum > 1 && this.sum <= time_count) {
            this.sum--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },

    initWebSocket(id) {
      const wsUri = `${process.env.VUE_APP_WS}/oauth/${id}` // ws地址
      this.websocket = new WebSocket(wsUri)
      this.websocket.onopen = this.onOpen
      this.websocket.onerror = this.onError
      this.websocket.onmessage = this.onMessage
      this.websocket.onclose = this.onClose
    },

    onOpen() {
    },
    onError(e) {
    },
    onMessage(e) {
      let data = e.data
      console.log(data)
      console.log(JSON.parse(data))
      if (data.code === 200) {
        if (data.message === '连接成功') {
          this.send(this.wsId)
        }
        if (data.message === '登录') {
          // commit('SET_NAME', username)
          data = data.data
          setUsername(data.username)
          setToken(data.tokenHead + ' ' + data.token)
        }
      }
    },

    send(agentData) {
      this.websocket.send(agentData)
    },

    onClose(e) {
      console.log('WebSocket connection closed')
    }
  }
}
</script>

<style lang="scss">
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    margin-bottom: 20px;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.email{
  margin-left: 40px
}
.alipay-icon{
  margin-left: 40px;
  width: 2em;
  height: 1.8em;
}
</style>
