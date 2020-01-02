<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="登录" />
    <!-- 登录部分 -->
    <van-cell-group>
      <!-- 使用VeeValidate校验器
        1. 通过v-validate设置验证的规则
        2. 设置文本框的name属性（err时绑定）
        3. 展示验证错误信息
      -->
      <van-field
        v-validate="'required|digits:11'"
        name="userMobile"
        :error-message="errors.first('userMobile')"
        clearable
        v-model="user.mobile"
        left-icon="phone"
        placeholder="请输入手机号"
      />
      <van-field
        v-validate="'required|digits:6'"
        name="userCode"
        :error-message="errors.first('userCode')"
        v-model="user.code"
        left-icon="lock"
        placeholder="请输入密码"
      >
        <van-button class="sendCode" slot="button" type="default" size="small">获取验证码</van-button>
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
      },
      // 配置自定义校验规则信息
      dict: {
        custom: {
        // 验证的文本框
          userMobile: {
          // 规则的提示信息
            required: '手机号不能为空',
            digits: '请输入合法的手机号'
          },
          userCode: {
            required: '验证码不能为空',
            digits: '请正确输入验证码'
          }
        }
      }
    }
  },
  created () {
    // 自定义校验提示信息
    this.$validator.localize('zhCN', this.dict)
  },
  methods: {
    // mapActions 将store中的actions的方法映射到methods中，调用时调用actions中的方法名即可
    ...mapActions(['SET_USER_SYNC']),
    // 登录操作
    // async await 可以将promise对象拆分成一个普通对象
    async handleLogin () {
      try {
        // 表单验证
        this.$validator.validate().then(async (valid) => {
          // 验证不通过
          if (!valid) {
            return
          }
          const data = await login(this.user)
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
        })
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
