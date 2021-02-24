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
          {{ scope.row.creatTime }}
        </template>
      </el-table-column>
      <el-table-column label="创建人" min-width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.createUser || 'admin' }}
        </template>
      </el-table-column>
      <el-table-column label="角色" min-width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.roles.includes("admin") ? "管理员" : "普通用户" }}
          <!--          {{ scope.row.roles }}-->
        </template>
      </el-table-column>
      <el-table-column label="修改角色" min-width="110" align="center">
        <el-button size="mini" type="warning" @click="updateRolesEvent($event)">
          修改角色
        </el-button>
      </el-table-column>
      <el-table-column label="修改密码" min-width="110" align="center">
        <el-button size="mini" type="warning" @click="updatePasswordEvent($event)">
          修改密码
        </el-button>
      </el-table-column>
      <el-table-column label="删除用户" min-width="110" align="center">
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

    <el-dialog title="修改角色" :visible="dialogFormVisibleForManager">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" style="width: 700px; margin-top: 20px;">
        <el-form-item label="是否为管理员" prop="isManager">
          <el-switch v-model="form.isManager" class="manager" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleForManager = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleForManager = false; updateRoles()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改密码" :visible="dialogFormVisibleForPassword">
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
      rules: {
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
      dialogFormVisibleForPassword: false,
      dialogFormVisibleForManager: false,
      updateUsername: ''
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
      })
    },
    refreshUserList() {
      this.getUserList(this.currentPage, this.pageSize)
    },
    updateRoles() {
      updateUserRoles({
        username: this.updateUsername,
        isManager: this.isManager
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
    updateRolesEvent(event) {
      this.updateUsername = event.currentTarget.parentElement.parentElement.previousElementSibling.previousElementSibling.innerText
      this.$confirm('此操作将修改该用户角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dialogFormVisibleForManager = true
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
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
    updatePasswordEvent(event) {
      this.updateUsername = event.currentTarget.parentElement.parentElement.previousElementSibling.previousElementSibling.innerText
      this.$confirm('此操作将修改该用户密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dialogFormVisibleForPassword = true
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
    },
    deleteUser(event) {
      const username = event.currentTarget.parentElement.parentElement.previousElementSibling.previousElementSibling.innerText
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
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
