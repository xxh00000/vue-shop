<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <div class="left">
        <img
          src="../assets/imgs/shop.png"
          alt=""
        >
        <span>电商后台管理系统</span>
      </div>
      <div class="right">
        <span class="right-span">欢迎您：{{ userInfo.username }}</span>
        <el-button
          type="danger"
          size="mini"
          @click="loginout"
        >退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
              <el-menu-item index="1-3">选项3</el-menu-item>
              <el-menu-item index="1-3">选项3</el-menu-item>
              <el-menu-item index="1-3">选项3</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      userInfo: null,
      menuList: []
    };
  },
  created() {
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    this.getMenuList()
  },
  methods: {
    loginout() {
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出登录成功!",
          });
          sessionStorage.clear();
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //获取左侧菜单列表
  async getMenuList() {
    const {data:res} = await this.$http.get('menus')
    console.log(res)
    if(res.meta.status !== 200){
      this.$message.error('res.meta.msg')
    }
    this.menuList = res.data
    console.log(this.menuList)
    }
  },
};
</script>

<style>
.el-container {
  height: 100%;
}
.el-header {
  background: url("../assets/imgs/header_bg.gif") repeat-x center;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}
.left {
  display: flex;
  align-items: center;
  font-size: 20px;
}
.el-header img {
  width: 40px;
  margin-right: 20px;
}
.right-span {
  margin-right: 40px;
}
</style>