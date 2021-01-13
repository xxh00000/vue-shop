<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加按钮 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addDialogVisible = true">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表 -->
      <el-table :data="roleList" border stripe>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="editRoleDialog(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRoleDialog(scope.row.id)">删除</el-button>
            <el-button type="warning" size="mini" icon="el-icon-setting">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="addDialogVisible" width="50%" @close="addRolesClose">
      <!-- 表单 -->
      <el-form :model="addForm" :rules="addFormrules" ref="addFormref" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑角色对话框 -->
    <el-dialog title="编辑角色" :visible.sync="editDialogVisible" width="50%" @close="editRolesClose">
      <!-- 表单 -->
      <el-form :model="editForm" :rules="editFormrules" ref="editFormref" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleList: [],
      //添加对话框显示隐藏
      addDialogVisible: false,
      //添加角色表单
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      addFormrules: {
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        roleDesc: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
      },
      //编辑对话框显示隐藏
      editDialogVisible: false,
      editForm: {},
      //编辑表单验证
      editFormrules: {
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        roleDesc: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    //获取角色列表
    async getRoleList() {
      const { data: res } = await this.$http.get(`roles`)
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败')
      }
      this.roleList = res.data
      //console.log(this.roleList)
    },
    //添加角色条目
    addRole() {
      this.$refs.addFormref.validate(async valid => {
        if (!valid) {
          return
        }
        const { data: res } = await this.$http.post(`roles`, this.addForm)
        if (res.meta.status !== 201) {
          //console.log(res)
          return this.$message.error('添加失败')
        }
        this.addDialogVisible = false
        this.$message.success('添加成功')
        this.getRoleList()
      })
    },
    //检测添加角色关闭对话框
    addRolesClose() {
      this.$refs.addFormref.resetFields()
    },
    //编辑角色对话框显示
    async editRoleDialog(id) {
      const { data: res } = await this.$http.get(`roles/${id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('编辑角色对话框显示失败')
      }
      this.editForm = res.data
      this.editDialogVisible = true
    },
    //编辑角色
    editRole() {
      this.$refs.editFormref.validate(async valid => {
        if (!valid) {
          return
        }
        const { data: res } = await this.$http.put(`roles/${this.editForm.roleId}`, {
          roleName: this.editForm.roleName,
          roleDesc: this.editForm.roleDesc
        })
        if (res.meta.status !== 200) {
          return this.$message.error('修改角色失败')
        }
        this.$message.success('修改角色成功')
        this.getRoleList()
        this.editDialogVisible = false
      })
    },
    editRolesClose() {
      this.$refs.editFormref.resetFields()
    },
    //删除角色条目
    deleteRoleDialog(id){
       this.$confirm('是否要删除该角色？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
        const {data:res}= await this.$http.delete(`roles/${id}`)
        if(res.meta.status !== 200){
          return this.$message.error("删除角色失败")
        }
        this.getRoleList()
        this.$message.success("删除角色成功")
        }).catch(() => {
         this.$message.info("已经取消删除")         
        });
    }
  }
}
</script>

<style></style>
