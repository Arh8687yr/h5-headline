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
      <!-- 我的方式 -->
      <!-- <van-button type="danger" :loading="false" @click="handleFollow" v-show="!isFollow">加关注</van-button>
      <van-button type="danger" :loading="false" @click="cnacleFollow" v-show="isFollow">已关注</van-button> -->

      <!-- 老师方式 -->
      <van-button type="danger" :loading="loading" @click="handleFollow">{{article.is_followed? '已':''}}关注</van-button>
    </div>
  </div>
</template>

<script>
// 获取相对时间的过滤器(可在main.js中做全局过滤器使用)
import { fmtDate } from '@/utils/day.js'
import { followUser, cancleFollowUser } from '@/api/user'
export default {
  name: 'author',
  props: ['article'],
  data () {
    return {
      loading: false
    }
  },
  filters: {
    fmtDate
  },
  methods: {
    // 点击关注/取消关注按钮
    async handleFollow () {
      this.loading = true
      // 判断是否登录
      try {
        // this.article.is_followed = !this.article.is_followed
        if (this.article.is_followed) {
        // 用户已经关注 则取消关注
          await cancleFollowUser(this.article.aut_id)
          this.article.is_followed = false
        } else {
          await followUser(this.article.aut_id)
          this.article.is_followed = true
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
      this.loading = false
    }
  },
  created () {

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
