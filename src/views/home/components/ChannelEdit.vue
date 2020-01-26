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
      <van-grid-item v-for="(channel,index) in channels" :key="channel.id">
        <div slot="text" class="van-grid-item__text" :class="{active:activeIndex === index}">{{channel.name}}</div>
        <!-- 通过默认的slot default实现的 -->
        <van-icon slot="icon" class="close-icon" name="close" v-show="isEdit" />
      </van-grid-item>
    </van-grid>
    <van-cell title="推荐频道" label="点击添加频道" />
    <van-grid>
      <van-grid-item
        v-for="allChannel in recommendChannels"
        :key="allChannel.id"
        :text="allChannel.name"
        class="grid-item"
      ></van-grid-item>
    </van-grid>
  </van-popup>
</template>

<script>
import { getAllChannels } from '@/api/channel'
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
    },
    activeIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      // 是否为编辑模式
      isEdit: false,
      // 所有频道列表
      allChannelList: []
    }
  },
  computed: {
    // 推荐频道
    recommendChannels () {
      // 1. 获取我的频道中所有id组成的数组
      const ids = this.channels.map(channel => {
        return channel.id
      })
      // 2. 过滤所有频道，取出重复id的频道
      return this.allChannelList.filter(channel => {
        // [].includes ES6 新增，判断数组中是否包含某一项
        return !ids.includes(channel.id)
      })
    }
  },
  methods: {
    async getAllChannel () {
      try {
        const data = await getAllChannels()
        this.allChannelList = data.channels
        // console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
  },
  created () {
    this.getAllChannel()
  }
}
</script>

<style lang="less" scoped>
.close-icon {
  position: absolute;
  right: -47px;
  top: -15px;
}
.active {
  color: red;
  font-weight: bold;
}
</style>
