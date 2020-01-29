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
        :title="suggestion"
        icon="search"
      />
    </van-cell-group>
    <!-- 历史记录 -->
    <van-cell-group v-show="!value">
      <van-cell title="历史记录">
        <!-- 自定义右侧内容 -->
        <div>
          <div v-show="isDel" style="display:inline-block">
            <span>全部删除</span>&nbsp;
            <span @click="isDel=false">完成</span>&nbsp;
          </div>
          <van-icon @click="isDel=true" v-show="!isDel" name="delete" size="18px" />
        </div>
      </van-cell>
      <van-cell v-for="history in historyList" :key="history" :title="history">
        <van-icon v-show="isDel" name="cross" size="16px" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestion, userHistory } from '@/api/search'
import { mapState } from 'vuex'
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
    onCancel () {},
    async onInput () {
      if (this.value.length === 0) return
      try {
        const data = await getSuggestion(this.value)
        this.suggestionList = data.options
      } catch (error) {
        console.log(error)
      }
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
