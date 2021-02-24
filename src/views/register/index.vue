<template>
  <div>
    <el-card class="box-card" style=" margin:42px 40px; height: 80vh">
      <div slot="header" class="clearfix">
        <div class="grid-content bg-purple-light" style="font: 20px Extra large;" align="center"> 用户注册 </div>
      </div>
      <div class="card-body-right" style="margin-top: 10vh" align="center">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px" style="width: 700px; margin-top: 20px;">
          <el-form-item label="用户名" prop="username">
            <el-row>
              <el-col :span="12"><el-input v-model="form.username" /></el-col>
              <el-col :span="12"><div class="input-right-text">用户名由3-10个（英文字母、汉字、数字）组成</div></el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-row>
              <el-col :span="12"><el-input v-model="form.password" /></el-col>
              <el-col :span="12"><div class="input-right-text">支持英文字母、数字、符号，8-20个字符</div></el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="重复密码" prop="repassword">
            <el-row>
              <el-col :span="12"><el-input v-model="form.repassword" /></el-col>
              <el-col :span="12"><div class="input-right-text" /></el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="是否为管理员" prop="isManager">
            <el-switch v-model="form.isManager" class="manager" />
          </el-form-item>
        </el-form>
        <el-button type="primary" style="background-color: #34bfa3;" @click="register">立即注册</el-button>
      </div>
    </el-card>

  </div>
</template>

<script>
import { saveUser } from '@/api/user'
import { getUsername } from '@/utils/auth'
import { validUsername, validUsernameOrPassword } from '@/utils/validate'
import Message from 'element-ui/packages/message/src/main'
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
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: this.validRePassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register() {
      const roles = this.form.isManager ? ['admin', 'user'] : ['user']
      saveUser({
        username: this.form.username,
        password: this.form.password,
        createUser: getUsername(),
        roles: roles
      }).then(data => {
        if (data) {
          Message.success('注册成功')
        } else {
          Message.error('注册失败， 原因未知')
        }
      })
    },
    validRePassword(rule, value, callback) {
      if (value !== this.form.repassword) {
        callback(new Error('两次输入密码不一致，请重新输入'))
      }
    }
  }
}
</script>

<style scoped>
.input-right-text{
  padding-left: 10px;
  font: 12px Extra Small;
  padding-top: 10px;
}
.manager{
  margin-left: -92% !important;
}
</style>
