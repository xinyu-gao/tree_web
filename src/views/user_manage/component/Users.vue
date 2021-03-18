<template>
  <div style="height: 68vh">
    <el-table :data="userList" stripe max-height="100%" style="height: 62vh; width: 100%;">
      <el-table-column label="用户名" min-width="130" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" min-width="110" align="center">
        <template slot-scope="scope">
          {{ handleTime(scope.row.creatTime) }}
        </template>
      </el-table-column>
      <el-table-column label="创建人" min-width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.createUser || 'admin' }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱" min-width="170" align="center">
        <template slot-scope="scope">
          <span class="update-email-text">{{ scope.row.email }}</span>
          <el-button
            icon="el-icon-edit"
            circle
            class="update-button"
            size="small"
            @click="updateEmailEvent($event)"
          />
        </template>
      </el-table-column>
      <el-table-column label="手机号码" min-width="140" align="center">
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
          <el-col :span="11">
            <el-form-item label="email" prop="email">
              <el-row>
                <el-col :span="12"><el-input v-model="email" /></el-col>
                <el-col :span="12"><div class="input-right-text">支持英文字母、数字、符号，8-20个字符</div></el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="12"><div v-if="seeRolesWarning" class="input-right-text" style="color:red">请选择角色</div></el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleForManager = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleForManager = false; updateRoles()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改手机号码" :visible.sync="dialogFormVisibleForPhoneNumber" width="40%">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" style="width: 700px; margin-top: 20px;">
        <el-row>
          <el-col :span="11"><el-form-item label="选择角色" prop="roles">
            <el-select v-model="phoneNumber" placeholder="请选择">
              <el-option
                v-for="item in phoneOptions"
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
        <el-button @click="dialogFormVisibleForManager = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleForManager = false; updateRoles()">确 定</el-button>
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
        <el-button @click="dialogFormVisibleForManager = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleForManager = false; updateRoles()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改密码" :visible.sync="dialogFormVisibleForPassword">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" style="width: 700px; margin-top: 20px;">
        <el-form-item label="密码" prop="password">
          <el-row>
            <el-col :span="12"><el-input v-model="form.password" /></el-col>
            <el-col :span="12"><div class="input-right-text">支持英文字母、数字、符号，8-20个字符</div></el-col>
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

</template>

<script>
import { getAllUsers, updateUserPassword, updateUserRoles, deleteUser } from '@/api/user.js'
import { validUsernameOrPassword } from '@/utils/validate'
import { handleTime } from '@/utils/commonUtil'

export default {
  name: 'Users',
  data() {
    return {
      total: 200,
      currentPage: 1,
      pageSize: 10,
      userList: [],
      form: {
        password: '',
        rePassword: '',
        isManager: true
      },
      roleOptions: [
        { value: 'superManager', label: '超级管理员' },
        { value: 'manager', label: '管理员' }
      ],
      roles: '',
      rules: {
        roles: [
          { required: true, message: '请选择角色', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 10, message: '长度在 8 到 20 个字符', trigger: 'blur' },
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
      seeRolesWarning: false
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
        console.log(data)
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
      this.updateUsername = this.updateUsername = this.getUsernameFromClickEvent(event, 3)
      this.dialogFormVisibleForEmail = true
    },
    updatePhoneNumberEvent(event) {
      this.updateUsername = this.updateUsername = this.getUsernameFromClickEvent(event, 4)
      this.dialogFormVisibleForPhoneNumber = true
    },
    updateRolesEvent(event) {
      this.updateUsername = this.getUsernameFromClickEvent(event, 5)
      this.dialogFormVisibleForRoles = true
    },
    updatePasswordEvent(event) {
      this.updateUsername = this.updateUsername = this.getUsernameFromClickEvent(event, 6)
      this.dialogFormVisibleForPassword = true
    },
    updateRoles() {
      const roles = this.converseRoles(this.roles)
      if (roles === null) {
        this.seeRolesWarning = true
      } else {
        this.seeRolesWarning = false
        updateUserRoles({
          username: this.updateUsername,
          roles: roles
        })
          .then(data => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.refreshUserList()
          }).catch(err => {
            console.log(err)
          })
      }
    },
    updatePassword() {
      updateUserPassword({
        username: this.updateUsername,
        password: this.rePassword
      })
        .then(data => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.refreshUserList()
        }).catch(err => {
          console.log(err)
        })
    },
    deleteUser(event) {
      event = event.currentTarget.parentElement.parentElement
      const num = 7
      for (let i = 0; i < num; i++) {
        event = event.previousElementSibling
      }
      const username = event.innerText

      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(username)
          .then(data => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.refreshUserList()
          }).catch(err => {
            console.log(err)
            this.$message({
              type: 'failed',
              message: `删除失败! ${err}`

            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
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
      } else {
        return null
      }
    }
  }
}
</script>

<style scoped>
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
</style>
