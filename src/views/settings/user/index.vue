<template>
  <div>
    <el-row>
      <el-col :xs="3" :sm="3" :md="7" :lg="7" :xl="7">
        <div style="min-height: 1px;" />
      </el-col>
      <el-col :xs="18" :sm="18" :md="10" :lg="10" :xl="10">
        <div>
          <el-card class="box-card">
            <div class="card-body">
              <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="right">
                <div class="title-container" align="center">
                  <h3 class="title">个人资料</h3>
                </div>
                <el-divider />
                <el-form-item prop="username" label="用户名" style="margin-top: 60px">
                  <el-input
                    v-model="form.username"
                    placeholder="用户名"
                  />
                </el-form-item>
                <el-form-item prop="email" label="邮箱">
                  <el-input
                    v-model="form.email"
                    placeholder="邮箱"
                  />
                </el-form-item>

                <el-form-item prop="code" label="邮箱验证码">
                  <el-input
                    ref="code"
                    v-model="mailCode"
                    auto-complete="on"
                    name="code"
                    placeholder="请输入邮箱验证码"
                  >
                    <el-button v-show="show" slot="append" @click="getEmailValidateCode">获取验证码</el-button>
                    <span v-show="!show" slot="append" class="show-pwd">请{{ showTimeCount }}s后再试</span>
                  </el-input>
                </el-form-item>
                <el-form-item prop="phone" label="手机号码">
                  <el-input
                    v-model="form.phoneNumber"
                    placeholder="手机号码"
                  />
                </el-form-item>
                <el-form-item prop="code" label="手机验证码">
                  <el-input
                    ref="phoneCode"
                    v-model="phoneCode"
                    auto-complete="on"
                    name="code"
                    placeholder="请输入手机验证码"
                  >
                    <el-button v-show="show" slot="append" class="show-pwd" @click="getPhoneValidateCode">获取验证码</el-button>
                    <span v-show="!show" slot="append" class="show-pwd">请{{ showTimeCount }}s后再试</span>
                  </el-input>
                </el-form-item>
                <el-form-item prop="roles" label="角色">
                  <el-input
                    v-model="form.roles"
                    placeholder="角色"
                    :disabled="true"
                  />
                </el-form-item>
                <el-form-item prop="roles" label="是否绑定支付宝">
                  <div style="margin-left:40px;color: #303133">{{ form.ali ? "已绑定" : "未绑定" }}</div>
                </el-form-item>
                <div align="center">
                  <el-button
                    :loading="loading"
                    style="width:100px;"
                    @click="save"
                  >保存
                  </el-button>
                </div>

              </el-form>
            </div>
          </el-card>
        </div>

      </el-col>
    </el-row>

  </div>
</template>

<script>

import { validEmail, validUsername, validUsernameOrPassword } from '@/utils/validate'
export default {
  components: { },
  data() {
    return {
      userData: {},
      form: {
        ali: ''
      },
      mailCode: '',
      phoneCode: '',
      show: true,
      seeEmailValidate: false,
      showTimeCount: '',
      loading: false,
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
      },
      timer: ''
    }
  },
  methods: {
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData.files.avatar
    },
    close() {
      this.imagecropperShow = false
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
    getPhoneValidateCode() {

    },
    save() {

    }

  }
}
</script>

<style lang="scss" scoped>
.avatar{
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 60px;
  margin-left: 60px;
}

.box-card {
  width: 100%;
  margin-top: 6vh;
  height: 80vh;
}

.card-body {
  padding-top: 20px;
}
</style>
