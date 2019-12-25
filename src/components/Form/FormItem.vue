<template>
  <div>
    <!-- form-item  绑定校验规则prop 获取input状态 验证规则并显示label -->
    <label for="">{{label}}</label>
    <div>
      <slot></slot>
      <p v-if="errStatus">{{errMessage}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['label', 'prop'],
  data () {
    return {
      // 错误提示信息
      errMessage: '',
      // 是否显示错误
      errStatus: false
    }
  }
}
</script>

<style>

</style>
