
<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar fixed title="黑马头条" />
    <!-- 频道列表 -->
    <van-tabs animated v-model="activeIndex">
      <!-- 遍历标签页，显示频道列表 -->
      <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
        <!-- 下拉加载最新数据 -->
        <van-pull-refresh
          v-model="currentChannel.pullLoading"
          @refresh="onRefresh"
          :success-text="successText"
        >
          <!-- 文章列表,不同的标签页下有不同的列表 -->
          <van-list
            v-model="currentChannel.loading"
            :finished="currentChannel.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="article in currentChannel.articles"
              :key="article.art_id.toString()"
              :title="article.title"
            >
              <!-- 封面文章信息 -->
              <div slot="label">
                <!-- 显示封面图片 -->
                <van-grid
                v-if="article.cover.type"
                :border="false"
                :column-num="3"
                >
                  <van-grid-item v-for="(img,index) in article.cover.images" :key="img + index">
                      <van-image lazy-load height="80" :src="img">
                      <!-- 图片加载提示 -->
                      <template v-slot:loading>
                        <van-loading type="spinner" saze="20" />
                      </template>
                    </van-image>
                  </van-grid-item>
                </van-grid>
                <p class="label">
                  <span>{{article.aut_name}}</span>
                  <span>{{article.comm_count}}评论</span>
                  <span>{{article.pubdate}}</span>
                  <span class="close">x</span>
                </p>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannels } from '@/api/channel'
import { getArticles } from '@/api/article'
import Vue from 'vue'
// 图片的懒加载  需要单独引入
import { Lazyload } from 'vant'

Vue.use(Lazyload)
export default {
  name: 'Home',
  data () {
    return {
      // 列表用的数据
      list: [],
      // 频道列表
      channels: [],
      // tab是组件中默认显示的tab项的索引
      // 通过该index，可以找到当前的频道对象
      activeIndex: 0,
      successText: ''
    }
  },
  created () {
    // 加载频道列表
    this.loadChannels()
  },
  computed: {
    // 返回当前的频道对象
    currentChannel () {
      return this.channels[this.activeIndex]
    }
  },
  methods: {
    // 加载频道列表
    async loadChannels () {
      try {
        const data = await getChannels()
        // 给所有的频道设置，时间戳和文章数组
        data.channels.forEach(channel => {
          channel.timestamp = null
          channel.articles = []
          // 上拉加载
          channel.loading = false
          channel.finished = false
          // 下拉加载
          channel.pullLoading = false
        })
        this.channels = data.channels
      } catch (err) {
        // console.log(err)
      }
    },
    // list组件的load
    async onLoad () {
      // 发送请求
      // 获取当前频道对象  --- 下面不需要写了，因为设置了一个当前频道的计算属性
      // const currentChannel = this.channels[this.activeIndex]
      //  当前频道对象 时间戳
      //  当前频道对象 文章数组
      const params = {
        // 频道的id
        channel_id: this.currentChannel.id,
        // 时间戳
        timestamp: this.currentChannel.timestamp || Date.now(),
        // 是否包含置顶1，0不包含
        with_top: 1
      }
      const data = await getArticles(params)
      // console.log(data)
      // 记录文章列表，记录最后一条数据的时间戳
      this.currentChannel.timestamp = data.pre_timestamp
      // [[], []]
      this.currentChannel.articles.push(...data.results)
      // console.log(this.currentChannel.articles)
      // 当前频道数据全部加载完成
      this.currentChannel.loading = false
    },
    // 下拉刷新组件
    async onRefresh () {
      try {
        const params = {
          // 频道的id
          channel_id: this.currentChannel.id,
          // 时间戳
          timestamp: Date.now(),
          // 是否包含置顶1，0不包含
          with_top: 1
        }
        const data = await getArticles(params)
        // 设置加载完毕
        this.currentChannel.pullLoading = false
        this.currentChannel.articles.unshift(...data.results)
        this.successText = `不错哦，成功加载了${data.results.length}条数据！`
      } catch (err) {
        console.log(err)
      }
    }
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
.label {
  clear: both;
  span {
    float: left;
    margin-right: 1rem;
  }
  .close {
    float: right;
  }
}
</style>
