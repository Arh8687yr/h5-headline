<template>
  <van-popup
    :value="value"
    @input="$emit('input',$event)"
    position="bottom"
    :style="{ height: '87%' }"
  >
    <van-cell icon="cross" @click="$emit('input',false)" />
    <van-cell title="我的频道" label="点击进入频道">
      <van-button round type="danger" size="mini" v-show="!isEdit" @click="isEdit=true">编辑</van-button>
      <van-button round type="danger" size="mini" v-show="isEdit" @click="isEdit=false">完成</van-button>
    </van-cell>
    <van-grid>
      <van-grid-item v-for="channel in channels" :key="channel.id" :text="channel.name">
        <!-- 通过默认的slot default实现的 -->
        <van-icon slot="icon" class="close-icon" name="close" v-show="isEdit"/>
      </van-grid-item>
    </van-grid>
    <van-cell title="推荐频道" label="点击添加频道" />
    <van-grid>
      <van-grid-item v-for="item in 8" :key="item" text="文字" class="grid-item">
      </van-grid-item>
    </van-grid>
  </van-popup>
</template>

<script>
export default {
  name: 'channelEdit',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    channels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      // 是否为编辑模式
      isEdit: false
    }
  }
}
</script>

<style lang="less" scoped>
  .close-icon {
    position: absolute;
    right: -47px;
    top: -15px;
  }
</style>
