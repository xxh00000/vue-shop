<!--
 * @Author: your name
 * @Date: 2020-12-14 14:32:49
 * @LastEditTime: 2020-12-15 09:58:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-shop\src\views\login.vue
-->
<template>
  <div class="login-container">
    <div class="login-left">
      <img src="../assets/login_img.png" alt="无法显示图片">
    </div>
    <div class="login-box">
      <div class="login-logo">
        <img src="../assets/login_logo.png" alt="logo">
      </div>
      <div class="login-title">
        <p>电商后台管理系统</p>
      </div>
      <!-- input表单 -->
      <div class="login-form">
        <el-form ref="form" :model="user" >
          <el-form-item>
            <el-input v-model="user.name"  placeholder="请输入用户名"
    prefix-icon=" iconfont icon-user" ></el-input>
           </el-form-item>
          <el-form-item>
            <el-input v-model="user.passward"  placeholder="请输入密码"
    prefix-icon=" iconfont icon-3702mima" ></el-input>
           </el-form-item>
           <el-button type="primary" class="login-butn">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        user:{
          name: '',
          passward: ''
        }
      }
    }
    
  }
</script>

<style>
.login-container{
  height: 100%;
  background-color: #93defe;
  /* 实现元素的水平垂直居中 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-left{
  margin-right: 100px
}
.login-box{
 height: 350px;
 width: 400px;
 background-color: white;
 border-radius: 6px;
 position: relative;
}
.login-logo{
  border: 4px #93defe solid;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  text-align: center;
  position: absolute;
  top: -60px;
  background-color: white;
  right: 140px;
}
.login-logo img{
  width: 70px;
  height: 70px;
}
.login-title{
  font-size: 20px;
  color: #444444;
  position:absolute;
  top: 80px;
  left: 115px;
}
.login-form{
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  padding: 10% 20%;
  box-sizing: border-box;
  width: 400px;
  

}
.login-butn{
  width: 100%;
}
</style>