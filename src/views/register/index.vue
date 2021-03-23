<template>
  <div class="login-container">
    <el-form ref="form" :model="form" :rules="rules" auto-complete="on" class="login-form" label-position="left">

      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="form.username"
          placeholder="用户名"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          v-model="form.password"
          placeholder="密码"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          v-model="form.rePassword"
          placeholder="重复密码"
        />
      </el-form-item>
      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="email" />
        </span>
        <el-input
          v-model="form.email"
          placeholder="邮箱"
          @keyup.enter.native="register"
        />
      </el-form-item>
      <el-form-item prop="code">
        <span class="svg-container">
          <svg-icon icon-class="validateCode" />
        </span>
        <el-input
          ref="code"
          v-model="form.code"
          :type="codeType"
          auto-complete="on"
          name="code"
          placeholder="请输入邮箱验证码"
        />
        <span v-show="show" class="show-pwd" @click="getEmailValidateCode">获取验证码</span>
        <span v-show="!show" class="show-pwd">请{{ showTimeCount }}s后再试</span>
      </el-form-item>
      <el-button
        :loading="loading"
        style="width:100%;margin-bottom:30px;"
        type="primary"
        @click.native.prevent="register"
      >立即注册
      </el-button>
      <el-link
        type="success"
        style="font: 15px Small;color: #b3e19d;margin-left:300px"
        :underline="false"
      ><router-link to="/">以游客方式访问 >>> </router-link> </el-link>
    </el-form>
  </div>
</template>

<script>
import { saveUser } from '@/api/user'
import { getUsername } from '@/utils/auth'
import { validEmail, validUsername, validUsernameOrPassword } from '@/utils/validate'

export default {
  name: 'Register',
  data() {
    return {
      form: {
        username: '',
        password: '',
        repassword: '',
        isManager: false
      },
      show: true,
      sum: '',
      timer: null,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
          { validator: validUsername, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 10, message: '长度在 8 到 20 个字符', trigger: 'blur' },
          { validator: validUsernameOrPassword, trigger: 'blur' }
        ],
        rePassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: this.validRePassword, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validEmail, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    showTimeCount: function() {
      return this.sum
    }
  },
  methods: {
    register() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const roles = this.form.roles ? ['manager', 'superManager'] : ['manager']
          saveUser({
            username: this.form.username,
            password: this.form.password,
            createUser: getUsername(),
            roles: roles,
            email: this.form.email,
            phone: this.form.email
          }).then(data => {
            this.$message.success('注册成功')
            this.loading = true
            this.$store.dispatch('user/login',
              {
                username: this.form.username,
                password: this.form.password
              })
              .then(() => {
                this.$router.push({ path: this.redirect || '/' })
                this.loading = false
              }).catch((err) => {
                console.log(err)
                this.loading = false
              })
          }).catch(err => {
            this.$message.error(`注册失败：${err}`)
          })
        }
      })
    },
    validRePassword(rule, value, callback) {
      if (value !== this.form.repassword) {
        callback(new Error('两次输入密码不一致，请重新输入'))
      }
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
    }
  }
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

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

.email {
  margin-left: 40px
}
</style>
<style lang="scss">
$bg: #283443;
$light_gray: #fff;
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
