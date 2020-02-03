<template>
  <div class="auth-info">
    <div class="base-info">
      <img class="avatar" src="article.aut_photo" alt />
      <div>
        <p>{{article.aut_name}}</p>
        <p>{{article.pubdate | fmtDate}}</p>
      </div>
    </div>
    <div>
      <van-button type="danger" :loading="false">关注</van-button>
    </div>
  </div>
</template>

<script>
// 获取相对时间的过滤器(可在main.js中做全局过滤器使用)
import { fmtDate } from '@/utils/day.js'
export default {
  name: 'author',
  props: ['article'],
  filters: {
    fmtDate
  }
}
</script>

<style lang="less" scoped>
.auth-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  .base-info {
    display: flex;
    align-items: center;
    .avatar {
      margin-right: 10px;
      width: 60px;
      height: 60px;
      border-radius: 100%;
    }
  }
}
</style>
