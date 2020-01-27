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
      <van-grid-item v-for="(channel,index) in channels" :key="channel.id" @click="handleEdit(index,channel.id)">
        <div slot="text" class="van-grid-item__text" :class="{active:activeIndex === index}">{{channel.name}}</div>
        <!-- 通过默认的slot default实现的 -->
        <van-icon slot="icon" class="close-icon" name="close" v-show="isEdit && index != 0" />
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
import { getAllChannels, delChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/sessionStorage'
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
    ...mapState(['user']),
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
    },
    async handleEdit (index, channelId) {
      // 1. 如果不是编辑模式，点击频道后将弹出层关闭，并将当前频道展示为点击的频道
      if (!this.isEdit) {
        this.$emit('activeChange', index)
        return
      }
      // 2. 如果是编辑模式，
      // 2.1 点击按钮将频道从我的频道移除
      // 父组件传给子组件的channels对象，使得两个组件指向同一个地址，子组件可以修改对象的属性，但是不可以重新给对象赋值
      this.channels.splice(index, 1)
      // 2.2 判断是否登录
      if (this.user) {
      // 如果登录，发送请求，
        try {
          await delChannel(channelId)
        } catch (err) {
          this.$toast.fail('请求失败')
        }
        return
      }
      //  如果没有登录，将频道列表记录到本地存储
      setItem('channels', this.channels)
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
