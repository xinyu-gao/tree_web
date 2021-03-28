<template>
  <div>
    <el-row :gutter="24">
      <el-col :lg="8" :md="12" :sm="12" :xl="8" :xs="24">
        <el-card class="box-card">

          <div class="card-body">
            <el-form ref="form" :model="form" :rules="rules" label-width="90px" label-position="left">
              <div class="title-container">
                <h3 class="title">个人资料</h3>
              </div>
              <el-divider />
              <pan-thumb :image="image" />

              <!--              <el-button type="primary" icon="el-icon-upload" style="bottom: 15px;margin-left: 40px;" @click="imagecropperShow=true">-->
              <!--                Change Avatar-->
              <!--              </el-button>-->
              <el-divider />
              <el-form-item prop="username" label="用户名" style="margin-top: 30px">
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
                  v-model="form.code"
                  auto-complete="on"
                  name="code"
                  placeholder="请输入邮箱验证码"
                />
                <span v-show="show" class="show-pwd" @click="getEmailValidateCode">获取验证码</span>
                <span v-show="!show" class="show-pwd">请{{ showTimeCount }}s后再试</span>
              </el-form-item>
              <el-form-item prop="phone" label="手机号码">
                <el-input
                  v-model="form.phoneNUmber"
                  placeholder="手机号码"
                />
              </el-form-item>
              <el-form-item prop="code" label="手机验证码">
                <el-input
                  ref="code"
                  v-model="form.code"
                  auto-complete="on"
                  name="code"
                  placeholder="请输入手机验证码"
                />
                <span v-show="show" class="show-pwd" @click="getPhoneValidateCode">获取验证码</span>
                <span v-show="!show" class="show-pwd">请{{ showTimeCount }}s后再试</span>
              </el-form-item>
              <el-form-item prop="roles" label="角色">
                <el-input
                  v-model="form.roles"
                  placeholder="角色"
                  :disabled="true"
                />
              </el-form-item>

              <el-button
                align="center"
                :loading="loading"
                style="width:100px;margin-left: 180px"
                @click="save"
              >保存
              </el-button>
            </el-form>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="8" :md="12" :sm="12" :xl="8" :xs="24" />

    </el-row>
    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="300"
      :height="300"
      url="https://httpbin.org/post"
      lang-type="en"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
  </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import { validEmail, validUsername, validUsernameOrPassword } from '@/utils/validate'
export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      userData: {},
      form: {},
      show: true,
      seeEmailValidate: false,
      imagecropperShow: false,
      imagecropperKey: 0,
      image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191',
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
      }
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
  width: 480px;
  margin-top: 6vh;
  height: 80vh;
  margin-left: 25px;
}

.card-body {
  padding-top: 20px;
}

</style>
