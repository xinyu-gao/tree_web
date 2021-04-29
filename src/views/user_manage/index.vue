<template>
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
            <el-button type="primary" icon="el-icon-search" class="search-content search" @click="searchByName"> 搜索</el-button>
            <el-button type="info" icon="el-icon-delete" class="search-content " @click="cleanSearch"> 清除</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="card-body-right" style="padding-top: 10px;">
        <div style="height: 68vh">
          <el-table :data="userList" stripe max-height="100%" style="height: 62vh; width: 100%;" @sort-change="sortChangeHandle">
            <el-table-column label="用户名" min-width="90" align="center" sortable="custom">
              <template slot-scope="scope">
                {{ scope.row.username }}
              </template>
            </el-table-column>
            <el-table-column label="创建人" min-width="90" align="center" sortable="custom">
              <template slot-scope="scope">
                {{ scope.row.createUser || 'admin' }}
              </template>
            </el-table-column>
            <el-table-column label="邮箱" min-width="150" align="center">
              <template slot-scope="scope">
                <span class="update-email-text">{{ scope.row.email || '暂无' }}</span>
                <el-button
                  icon="el-icon-edit"
                  circle
                  class="update-button"
                  size="small"
                  @click.native.prevent="updateEmailEvent($event)"
                />
              </template>
            </el-table-column>
            <el-table-column label="手机号码" width="180" align="center">
              <template slot-scope="scope">
                <span class="update-text">{{ scope.row.phoneNumber || '暂无' }}</span>
                <el-button
                  icon="el-icon-edit"
                  circle
                  class="update-button"
                  size="small"
                  @click="updatePhoneNumberEvent($event)"
                />
              </template>
            </el-table-column>
            <el-table-column label="拥有角色" min-width="130" align="center">
              <template slot-scope="scope">
                <span class="update-text">{{ handleRoles(scope.row.roles) }}</span>
                <el-button
                  type="warning"
                  icon="el-icon-edit"
                  circle
                  class="update-button"
                  size="small"
                  @click="updateRolesEvent($event)"
                />
              </template>
            </el-table-column>
            <el-table-column label="创建时间" min-width="130" align="center" sortable="custom">
              <template slot-scope="scope">
                {{ handleTime(scope.row.creatTime) }}
              </template>
            </el-table-column>
            <el-table-column label="修改时间" min-width="130" align="center" sortable="custom">
              <template slot-scope="scope">
                {{ handleTime(scope.row.updateTime) }}
              </template>
            </el-table-column>
            <el-table-column label="修改密码" min-width="100" align="center">
              <el-button size="mini" type="warning" @click="updatePasswordEvent($event)">
                修改密码
              </el-button>
            </el-table-column>
            <el-table-column label="删除用户" min-width="100" align="center">
              <el-button size="mini" type="danger" @click="deleteUser($event)">
                删除用户
              </el-button>
            </el-table-column>

          </el-table>
          <el-pagination
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total"
            align="center"
            style="padding-top: 3vh"
            @current-change="handleCurrentChange"
          />
          <el-dialog title="修改邮箱" :visible.sync="dialogFormVisibleForEmail" width="40%">
            <el-form ref="form" :model="form" :rules="rules" label-width="120px" style="width: 700px; margin-top: 20px;">
              <el-row>
                <el-col :span="15">
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="email" />
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <div v-if="seeEmailWarning" class="input-right-text" style="color:red">{{ seeEmailWarningText }}</div>
                </el-col>
              </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisibleForEmail = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisibleForEmail = false; updateEmail()">确定修改</el-button>
            </div>
          </el-dialog>

          <el-dialog title="修改手机号码" :visible.sync="dialogFormVisibleForPhoneNumber" width="40%">
            <el-form ref="form" :model="form" :rules="rules" label-width="120px" style="width: 700px; margin-top: 20px;">
              <el-row>
                <el-col :span="15">
                  <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="phone" />
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <div v-if="seePhoneWarning" class="input-right-text" style="color:red">{{ seePhoneWarningText }}</div>
                </el-col>
              </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisibleForPhoneNumber = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisibleForPhoneNumber = false; updatePhoneNumber()">确定修改</el-button>
            </div>
          </el-dialog>

          <el-dialog title="修改角色" :visible.sync="dialogFormVisibleForRoles" width="40%">
            <el-form ref="form" :model="form" :rules="rules" label-width="120px" style="width: 700px; margin-top: 20px;">
              <el-row>
                <el-col :span="11"><el-form-item label="选择角色" prop="roles">
                  <el-select v-model="roles" placeholder="请选择">
                    <el-option
                      v-for="item in roleOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item></el-col>
                <el-col :span="12"><div v-if="seeRolesWarning" class="input-right-text" style="color:red">请选择角色</div></el-col>
              </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisibleForRoles = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisibleForRoles = false; updateRoles()">确定修改</el-button>
            </div>
          </el-dialog>

          <el-dialog title="修改密码" :visible.sync="dialogFormVisibleForPassword">
            <el-form ref="form" :model="form" :rules="rules" label-width="120px" style="width: 700px; margin-top: 20px;">
              <el-form-item label="密码" prop="password">
                <el-row>
                  <el-col :span="12"><el-input v-model="form.password" /></el-col>
                  <el-col :span="12"><div class="input-right-text">支持英文字母、数字、符号，6-20个字符</div></el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="重复密码" prop="rePassword">
                <el-row>
                  <el-col :span="12"><el-input v-model="form.rePassword" /></el-col>
                  <el-col :span="12"><div class="input-right-text" /></el-col>
                </el-row>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisibleForPassword = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisibleForPassword = false; updatePassword()">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </el-card>
    <div style="padding-top: 25px; font:	15px Extra Small">说明：
      <i class="header-icon el-icon-info" />
      数据库中存储的是加密后的密码，所以无法找回原来的密码，只能设置新的密码
    </div>
  </div>
</template>

<script>
import { validateEmail, validateMobile, validUsernameOrPassword } from '@/utils/validate'
import {
  deleteUser,
  getAllUsers,
  getUserListSorted,
  updateUserEmail,
  updateUserPassword,
  updateUserPhoneNumber,
  updateUserRoles,
  getUserBySearch
} from '@/api/user'
import { handleTime } from '@/utils/commonUtil'
export default {
  name: 'UserManger',
  data() {
    return {
      searchCondition: '',
      inputSearchName: '',
      conditionOptions: [
        {
          value: 'username',
          label: '用户名'
        }, {
          value: 'email',
          label: '邮箱'
        }, {
          value: 'phoneNumber',
          label: '手机号码'
        }
      ],
      total: 200,
      currentPage: 1,
      pageSize: 10,
      userList: [],
      form: {
        password: '',
        rePassword: ''
      },
      roleOptions: [
        { value: 'superManager', label: '超级管理员' },
        { value: 'manager', label: '管理员' },
        { value: 'user', label: '普通用户' }
      ],
      roles: '',
      rules: {
        roles: [
          { required: true, message: '请选择角色', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 20 个字符', trigger: 'blur' },
          { validator: validUsernameOrPassword, trigger: 'blur' }
        ],
        rePassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: this.validRePassword, trigger: 'blur' }
        ]
      },
      dialogFormVisibleForEmail: false,
      dialogFormVisibleForPhoneNumber: false,
      dialogFormVisibleForPassword: false,
      dialogFormVisibleForRoles: false,
      updateUsername: '',
      seeRolesWarning: false,
      seeEmailWarning: false,
      seePhoneWarning: false,
      seePhoneWarningText: '',
      seeEmailWarningText: '',
      email: '',
      phone: '',
      dict: { '用户名': ['username'],
        '创建人': ['createUser'],
        '拥有角色': ['roles'],
        '创建时间': ['createTime'],
        '修改时间': ['updateTime']

      }

    }
  },
  created() {
    this.refreshUserList()
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.getUserList(currentPage, this.pageSize)
    },
    getUserList(page, size) {
      getAllUsers({
        page: page - 1,
        size: size
      }).then(data => {
        this.userList = data.list
        this.total = data.total
      }).catch(err => {
        console.log(err)
      })
    },
    refreshUserList() {
      this.getUserList(this.currentPage, this.pageSize)
    },

    updateEmailEvent(event) {
      this.updateUsername = this.getUsernameFromClickEvent(event, 2)
      this.email = this.getCurrentValue(event)
      this.dialogFormVisibleForEmail = true
    },
    updatePhoneNumberEvent(event) {
      this.updateUsername = this.getUsernameFromClickEvent(event, 3)
      this.phone = this.getCurrentValue(event)
      this.dialogFormVisibleForPhoneNumber = true
    },
    updateRolesEvent(event) {
      this.updateUsername = this.getUsernameFromClickEvent(event, 4)
      this.dialogFormVisibleForRoles = true
    },
    updatePasswordEvent(event) {
      this.updateUsername = this.getUsernameFromClickEvent(event, 7)
      this.dialogFormVisibleForPassword = true
    },
    updateRoles() {
      const roles = this.converseRoles(this.roles)
      if (roles === null) {
        this.dialogFormVisibleForRoles = true
        this.seeRolesWarning = true
      } else {
        this.seeRolesWarning = false
        updateUserRoles({
          username: this.updateUsername,
          roles: roles
        })
          .then(_ => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.refreshUserList()
            this.roles = ''
          }).catch(err => {
            console.log(err)
          })
      }
    },
    updateEmail() {
      const email = this.email
      const result = validateEmail(email)
      if (result === true) {
        this.seeEmailWarning = false
        updateUserEmail({
          username: this.updateUsername,
          email: email
        })
          .then(_ => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.refreshUserList()
            this.email = ''
            this.dialogFormVisibleForEmail = false
          }).catch(err => {
            this.$message({
              type: 'warning',
              message: `修改失败：+${err}`
            })
            console.log(err)
            this.dialogFormVisibleForEmail = true
          })
      } else {
        this.seeEmailWarningText = '邮箱格式不正确'
        this.seeEmailWarning = true
        this.dialogFormVisibleForEmail = true
      }
    },
    updatePhoneNumber() {
      const phone = this.phone
      const result = validateMobile(phone)
      if (result === true) {
        this.seeEmailWarning = false
        updateUserPhoneNumber({
          username: this.updateUsername,
          phoneNumber: phone
        })
          .then(_ => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.refreshUserList()
            this.phone = ''
            this.dialogFormVisibleForPhoneNumber = false
          }).catch(err => {
            this.$message({
              type: 'warning',
              message: `修改失败：+${err}`
            })
            this.phone = ''
            console.log(err)
            this.dialogFormVisibleForPhoneNumber = true
          })
      } else {
        this.seePhoneWarningText = result
        this.seePhoneWarning = true
        this.dialogFormVisibleForPhoneNumber = true
      }
    },
    updatePassword() {
      const password = this.form.rePassword
      if (this.validPassword()) {
        updateUserPassword({
          username: this.updateUsername,
          password: password
        })
          .then(_ => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.refreshUserList()
          }).catch(err => {
            this.$message({
              type: 'warning',
              message: `修改失败：+${err}`
            })
            console.log(err)
          })
      } else {
        this.dialogFormVisibleForPassword = true
      }
    },
    deleteUser(event) {
      const username = this.getUsernameFromClickEvent(event, 8)
      this.$confirm(`此操作将删除用户 ${username}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser({ username: username })
          .then(_ => {
            this.$message.success('删除成功!')
            this.refreshUserList()
          }).catch(err => {
            console.log(err)
            this.$message.error(`删除失败! ${err}`)
          })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    handleTime(data) {
      return handleTime(data)
    },
    handleRoles(data) {
      if (data.includes('superManager')) {
        return '超级管理员'
      } else if (data.includes('manager')) {
        return '管理员'
      } else {
        return '普通用户'
      }
    },
    getCurrentValue(event) {
      return event.currentTarget.previousElementSibling.innerHTML
    },
    getUsernameFromClickEvent(event, num) {
      event = event.currentTarget.parentElement.parentElement
      for (let i = 0; i < num; i++) {
        event = event.previousElementSibling
      }
      return event.innerText
    },
    converseRoles(data) {
      if (data === 'manager') {
        return ['manager']
      } else if (data === 'superManager') {
        return ['manager', 'superManager']
      } else if (data === 'user') {
        return ['user']
      } else {
        return null
      }
    },
    validRePassword(rule, value, callback) {
      if (value !== this.form.rePassword) {
        callback(new Error('两次输入密码不一致，请重新输入'))
      }
    },
    validPassword() {
      if (!this.form.password || !this.form.rePassword) {
        this.$message({
          type: 'warning',
          message: `请填写密码`
        })
        return false
      }
      if (this.form.password !== this.form.rePassword) {
        this.$message({
          type: 'warning',
          message: `两次输入密码不一致`
        })
        return false
      }
      return true
    },
    sortChangeHandle(ls) {
      const fieldName = ls.column.label
      const sortingType = ls.column.order
      const key = this.dict[fieldName]
      this.listLoading = true
      if (sortingType === 'ascending') {
        getUserListSorted({
          page: this.currentPage - 1,
          size: this.pageSize,
          keys: key,
          asc: 1
        }).then(data => {
          this.userList = data.list
          this.listLoading = false
        }).catch(err => {
          console.log(err)
        })
      } else if (sortingType === 'descending') {
        getUserListSorted({
          page: this.currentPage - 1,
          size: this.pageSize,
          keys: key,
          asc: 0
        }).then(data => {
          this.userList = data.list
          this.listLoading = false
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.refreshUserList()
      }
    },
    searchByName() {
      if (this.searchCondition !== '' && this.inputSearchName !== '') {
        this.listLoading = true
        getUserBySearch({
          condition: this.searchCondition,
          value: this.inputSearchName
        }).then(data => {
          this.userList = data
          this.listLoading = false
        }).catch(err => {
          console.log(err)
          this.listLoading = false
        })
      }
    },
    cleanSearch() {
      this.refreshUserList()
    }

  }
}
</script>

<style scoped>
.tab-container {
  margin: 42px;
}
.update-button{
  margin-left: 10px;
}
.update-text{
  margin-left: 20px;
  display: inline-block;
  width: 90px;
}
.update-email-text{
  margin-left: 20px;
  display: inline-block;
  width: 140px;
}
.input-right-text{
  margin-left: 20px;
  font: 12px Extra Small;
  padding-top: 10px;
}
.search-content{
  margin-top: 6px;
}
.search{
  margin-left: 10px
}
</style>
