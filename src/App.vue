<template>
  <div id="app">
    <router-view />
  </div>
</template>


<style>
#app {
  color: #2c3e50;
  margin-top: 60px;
}
.titleImg {
  margin: 0 auto;
  display: block;
}
body {
  background-image: url('./assets/beijing.jpg'); /* 设置背景图片的路径 */
  background-size: cover; /* 控制背景图片的大小 */
  /*background-color: #0a0909; !* 设置背景颜色 *!*/
}
</style>
