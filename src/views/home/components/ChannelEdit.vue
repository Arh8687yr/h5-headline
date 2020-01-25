<template>
  <van-popup
  :value="value"
  @input="$emit('input',$event)"
  position="bottom"
  :style="{ height: '80%' }"
  >
  弹出层
  </van-popup>
</template>

<script>
export default {
  name: 'channelEdit',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
