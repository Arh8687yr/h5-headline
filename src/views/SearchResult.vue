<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="搜索结果" left-text="返回" left-arrow @click-left="$router.back()" fixed></van-nav-bar>
    <!-- 搜索结果列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="art in list" :key="art.art_id" :title="art.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'searchResult',
  props: ['q'],
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10
    }
  },
  methods: {
    async onLoad () {
      try {
        const data = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.q
        })
        this.list.push(...data.results)
        this.page++
        this.loading = false
        if (data.results.length === 0) {
          this.finished = true
        }
      } catch (err) {
        this.$toast.fail('请求加载失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-list {
  margin-top: 46px;
}
</style>
