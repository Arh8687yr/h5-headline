<template>
  <div>
    <!-- 顶部搜索框 -->
    <van-search
      v-model="value"
      placeholder="请输入搜索内容"
      show-action
      background="#3e9df8"
      clearable
      @search="onSearch(value)"
      @cancel="onCancel"
      @input="onInput"
    ></van-search>
    <!-- 搜索建议 -->
    <van-cell-group v-show="value">
      <van-cell
        @click="onSearch(suggestion)"
        v-for="suggestion in suggestionList"
        :key="suggestion"
        icon="search"
      >
      <!-- 此形式会将便签转义成字符串然后直接渲染到页面上，只有v-html才能将标签渲染 -->
        <!-- <div slot="title">{{ highLight(suggestion) }}</div> -->
        <div slot="title" v-html="highLight(suggestion)"></div>
      </van-cell>
    </van-cell-group>
    <!-- 历史记录 -->
    <van-cell-group v-show="!value">
      <van-cell title="历史记录">
        <!-- 自定义右侧内容 -->
        <div>
          <div v-show="isDel" style="display:inline-block">
            <span @click="delAllHistory">全部删除</span>&nbsp;
            <span @click="isDel=false">完成</span>&nbsp;
          </div>
          <van-icon @click="isDel=true" v-show="!isDel" name="delete" size="18px" />
        </div>
      </van-cell>
      <van-cell v-for="(history,index) in historyList" :key="history" :title="history" @click="onSearch(history)">
        <!-- stop 阻止事件冒泡 -->
        <van-icon @click.stop="delHistory(index)" v-show="isDel" name="cross" size="16px" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestion, userHistory } from '@/api/search'
import { mapState } from 'vuex'
import { debounce } from '@/utils/debounce'
import * as storageTools from '@/utils/sessionStorage'
export default {
  name: 'search',
  data () {
    return {
      value: '',
      suggestionList: [],
      // 删除模式
      isDel: false,
      // 历史搜索
      historyList: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 点击回车或者点击搜索项的时候，将内容存到历史搜索中
    onSearch (search) {
      // 点击搜索跳转到搜索结果页
      this.$router.push({
        name: 'searchResult',
        params: {
          q: search
        }
      })
      // 在添加以前筛选重复内容
      if (this.historyList.includes(search)) {
        return
      }
      this.historyList.unshift(search)
      // 判断用户是否登录
      if (this.user) {
        // 如果登录，发送请求，并将新的搜索历史保存
        return
      }
      // 没有登录，把历史记录存储到本地
      storageTools.setItem('history', this.historyList)
    },
    // 用户点击取消按钮
    onCancel () {
      this.$router.push('/')
    },
    // 用户输入时
    onInput: debounce(async function () {
      if (this.value.length === 0) return
      try {
        const data = await getSuggestion(this.value)
        this.suggestionList = data.options
      } catch (error) {
        console.log(error)
      }
    }, 300),
    // 用户点击删除搜索历史
    delHistory (index) {
      // 判断用户是否登录
      if (this.user) {
      // 如果登录，发送请求，从用户搜索历史中删除，并从界面移除此项
        this.historyList.splice(index, 1)
        return
      }
      // 如果没有登录，从本地删除此项，并从界面移除
      this.historyList.splice(index, 1)
      storageTools.setItem('history', this.historyList)
    },
    // 用户点击全部删除
    delAllHistory () {
      this.historyList = []
      storageTools.setItem('history', this.historyList)
    },
    // 高亮显示搜索项
    highLight (suggestion) {
      // g 全局 i 不区分大小写
      const reg = new RegExp(this.value, 'gi')
      return suggestion.replace(reg, `<span style="color:red">${this.value}</span>`)
    },
    async onLoad () {
      // 获取历史搜索，判断用户是否登录
      if (this.user) {
        // 如果登录，发送请求，获取用户的搜索历史
        const data = await userHistory()
        this.historyList = data.keywords || []
        return
      }
      // 如果没有登录，从本地获取
      this.historyList = storageTools.getItem('history') || []
    }
  },
  created () {
    this.onLoad()
  }
}
</script>

<style lang="less" scoped>
.van-search {
  padding: 6px 12px;
}
</style>
