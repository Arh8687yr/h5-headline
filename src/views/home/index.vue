
<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar fixed title="黑马头条" />
    <!-- 频道列表 -->
    <van-tabs animated v-model="activeIndex">
      <!-- 频道编辑 -->
      <van-icon @click="showChannelEdit=true" name="wap-nav" slot="nav-right" class="wap-nav" />
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
                <van-grid v-if="article.cover.type" :border="false" :column-num="3">
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
                  <span>{{article.pubdate | fmtDate}}</span>
                  <!-- 点击按钮，记录当前文章对象 -->
                  <span class="close" @click="handelAction(article)">x</span>
                </p>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 点击'x'更多操作 -->
    <!-- v-model: 等价于
            v-bind:value="showMoreAction"
            v-on:input="showMoreAction = $event"
    -->
    <!--
       v-bind单向绑定value值，此时的value需要在子组件中通过props['value']获取
       此时子组件触发父组件v-model注册的自定义事件（input），要想改变父组件的值，需要通过$emit将更改状态传给父组件
    -->
    <more-action v-if="currentArt" :article="currentArt" v-model="showMoreAction" @handleDislike="handleDislike" @handleBlackList="handleBlackList"></more-action>
    <!-- 频道编辑组件 -->
    <channel-edit @activeChange="activeChange" :activeIndex="activeIndex" :channels="channels" v-model="showChannelEdit"></channel-edit>
  </div>
</template>

<script>
import { getChannels } from '@/api/channel'
import { getArticles } from '@/api/article'
import Vue from 'vue'
// 图片的懒加载  需要单独引入
import { Lazyload } from 'vant'
import { fmtDate } from '@/utils/day.js'
// 点击'x'的更多操作
import MoreAction from './components/MoreAction'
// 点击按钮弹出频道编辑
import ChannelEdit from './components/ChannelEdit'
import { setItem, getItem } from '@/utils/sessionStorage'
Vue.use(Lazyload)
export default {
  name: 'Home',
  components: {
    MoreAction,
    ChannelEdit
  },
  data () {
    return {
      // 列表用的数据
      list: [],
      // 频道列表
      channels: [],
      // tab是组件中默认显示的tab项的索引
      // 通过该index，可以找到当前的频道对象
      activeIndex: 0,
      successText: '',
      showMoreAction: false,
      // 点击“x”时记录的当前的文章对象
      currentArt: null,
      // 控制频道编辑的弹出层显隐
      showChannelEdit: false
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
        let channels = []
        // 1. 如果登录，发送请求获取用户自己的频道列表
        if (this.$store.state.user) {
          const data = await getChannels()
          channels = data.channels
        } else {
          // 2. 如果没有登录，从本地获取，
          if (getItem('channels')) {
            channels = getItem('channels')
          } else {
            // 3. 如果本地没有，发送请求获取，并保存到本地
            const data = await getChannels()
            channels = data.channels
            setItem('channels', channels)
          }
        }
        // 给所有的频道设置，时间戳和文章数组
        channels.forEach(channel => {
          channel.timestamp = null
          // 当前频道的文章列表
          channel.articles = []
          // 上拉加载
          channel.loading = false
          channel.finished = false
          // 下拉加载
          channel.pullLoading = false
        })
        this.channels = channels
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
    },
    // 点击"X"按钮，弹出moreAction，并记录当前的文章对象
    handelAction (article) {
      this.showMoreAction = true
      this.currentArt = article
    },
    // 点击不感兴趣操作成功后
    handleDislike () {
      // 1. 隐藏弹出层
      this.showMoreAction = false
      // 2. 并将该条文章从列表中删除(找到文章索引)
      const currentArtList = this.currentChannel.articles
      const currentArtIndex = currentArtList.findIndex((article) => {
        return article.art_id === this.currentArt.art_id
      })
      currentArtList.splice(currentArtIndex, 1)
    },
    // 点击拉黑作者操作成功后
    handleBlackList () {
      // 1. 隐藏弹出层
      this.showMoreAction = false
      // 2. 并将该作者所有的文章从列表中删除
      // console.log('blackList')
    },
    // 点击我的频道跳转到对应频道
    activeChange (index) {
      this.activeIndex = index
      this.showChannelEdit = false
    }
  },
  filters: { fmtDate: fmtDate }
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
  .wap-nav {
    position: fixed;
    right: 5px;
    text-align: center;
    line-height: 44px;
    background-color: #fff;
    opacity: 0.8;
    font-size: 20px;
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
