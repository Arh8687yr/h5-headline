<template>
  <div>
    <!-- 顶部搜索框 -->
    <van-search
      v-model="value"
      placeholder="请输入搜索内容"
      show-action
      background="#3e9df8"
      clearable
      @search="onSearch"
      @cancel="onCancel"
      @input="onInput"
    ></van-search>
    <!-- 搜索建议 -->
    <van-cell-group v-show="value">
      <van-cell v-for="suggestion in suggestionList" :key="suggestion" :title="suggestion" icon="search" />
    </van-cell-group>
    <!-- 历史记录 -->
    <van-cell-group v-show="!value">
      <van-cell title="历史记录">
        <!-- 自定义右侧内容 -->
        <div>
          <span>全部删除</span>
          <span>完成</span>
          <van-icon name="delete" size="18px" />
        </div>
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="cross" size="16px" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
export default {
  name: 'search',
  data () {
    return {
      value: '',
      suggestionList: []
    }
  },
  methods: {
    onSearch () {},
    onCancel () {},
    async onInput () {
      if (this.value.length === 0) return
      try {
        const data = await getSuggestion(this.value)
        this.suggestionList = data.options
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-search{
  padding: 6px 12px;
}
</style>
