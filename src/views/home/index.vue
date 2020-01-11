<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="搜索框" fixed>
      <van-icon name="search" slot="left" />
      <van-icon name="search" slot="right" />
    </van-nav-bar>
    <!-- 标签栏 频道列表-->
    <van-tabs animated v-model="active">
      <van-tab v-for="channel in channelsList" :title="channel.name" :key="channel.id">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getArticleList">
          <van-cell v-for="(article,index) in currentChannel.articles"
          :key="index"
          :title="article.title" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannels } from '@/api/channel'
import { getArticles } from '@/api/article'
export default {
  name: 'home',
  data () {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false,
      // 频道列表
      channelsList: []
    }
  },
  computed: {
    // 返回当前的频道对象
    currentChannel () {
      return this.channelsList[this.active]
    }
  },
  methods: {
    // 获取频道对应的文章列表
    async getArticleList () {
      try {
        // 发送请求

        // 获取当前频道对象 (计算属性)
        const currentChannel = this.channelsList[this.active]
        var params = {
          channel_id: currentChannel.id,
          timestamp: currentChannel.timestamp || Date.now(),
          with_top: 1
        }
        const data = await getArticles(params)
        // console.log(data)
        //  当前频道对象的时间戳和文章数据
        currentChannel.timestamp = data.pre_timestamp
        this.currentChannel.articles.push(...data.results)
        // 数据全部加载完成
        this.loading = false
      } catch (err) {
      }
    },
    // 获取频道列表
    async getUserChannels () {
      try {
        const data = await getChannels()
        this.channelsList = data.channels
        // 给所有的频道设置时间戳和文章数组
        this.channelsList.forEach((channel) => {
          channel.timestamp = null // 初始写死将不会是最新的请求时间
          channel.articles = []
        })
      } catch (err) {}
    }
  },
  created () {
    this.getUserChannels()
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 2;
  }
  /deep/ .van-tabs__content {
    margin-top: 90px;
    margin-bottom: 50px;
  }
}
</style>
