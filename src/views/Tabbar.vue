<template>
  <div>
    <router-view></router-view>
    <!-- 此处是tabbar组件 -->
    <!-- 使用子路由的模式让四个页面共享tabbar组件 -->
    <van-tabbar route fixed>
      <!-- replace 不记录历史 -->
      <van-tabbar-item to="/" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item to="/qa" icon="search">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon="friends-o">视频</van-tabbar-item>
      <van-tabbar-item to="/user" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 设置tabbar是否显示
      active: 0
    }
  }
}
</script>

<style>

</style>
