<!--
 * @Author: Wang Jin
 * @Descripttion: 
 * @version: 
 * @Date: 2021-01-02 16:45:38
 * @LastEditors: Wang Jin
 * @LastEditTime: 2021-01-19 15:58:36
-->
<template>
  <div id="wrap">
    <div class="inner"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
#wrap {
  position: relative;
  width: 300px;
  height: 400px;
  border: 1px solid red;
  margin: 0 auto;
  .inner {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background: pink;
    height: 100px;
    width: 100px;
  }
}
</style>
