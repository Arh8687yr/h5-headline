<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="登录" />
    <!-- 登录部分 -->
    <van-cell-group>
      <van-field v-model="user.mobile" left-icon="phone" placeholder="请输入手机号"></van-field>
      <van-field v-model="user.code" left-icon="lock" placeholder="请输入密码">
        <van-button class="sendCode" slot="button" type="default" size="small">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="login_btn">
      <van-button class="btn" type="info" @click="handleLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
import { mapActions } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    // mapActions 将store中的actions的方法映射到methods中，调用时调用actions中的方法名即可
    ...mapActions(['SET_USER_SYNC']),
    // 登录操作
    // async await 可以将promise对象拆分成一个普通对象
    async handleLogin () {
      try {
        const data = await login(this.user)
        console.log(data)
        // 存储登录状态
        // 1. vuex
        // mutations方式
        // this.$store.commit('SET_USER', data)
        // actions方式
        // this.$store.dispatch('SET_USER_SYNC', data)
        // mapActions方式
        this.SET_USER_SYNC(data)
        // 2. 本地存储（vuex中完成存储操作）
        // window.sessionStorage.setItem('token', 'Bear ' + data.token)
        // 成功后跳转到首页
        this.$router.push('/')
        this.$toast.success('登录成功')
      } catch (err) {
        this.$toast.fail('登录失败，请重新登录')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-field {
  line-height: 2rem;
}
.login_btn {
  padding: 1rem;
  box-sizing: border-box;
  .btn {
    width: 100%;
  }
}
.sendCode {
  border-radius: 2rem;
}
</style>
