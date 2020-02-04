<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="文章详情" left-text="返回" fixed @click-left="$router.back()" />
    <div class="article" v-if="article">
      <!-- 文章标题 -->
      <h2 class="article-title">{{article.title}}</h2>
      <!-- 作者信息 -->
      <author :article="article"></author>
      <!-- 文章内容 -->
      <div class="article-content" v-html="article.content"></div>
      <!-- 点赞和取消 -->
      <like-or-no :article="article"></like-or-no>
    </div>
  </div>
</template>

<script>
import { getArtDetail } from '@/api/article'
// 作者信息
import author from './components/Author'
// 点赞和取消
import LikeOrNo from './components/LikeOrNo'
export default {
  name: 'detail',
  props: ['id'],
  components: {
    author,
    LikeOrNo
  },
  data () {
    return {
      article: {}
    }
  },
  methods: {
    async onload () {
      try {
        const data = await getArtDetail(this.id)
        this.article = data
      } catch (err) {
        this.$toast.fail('获取失败')
      }
    }
  },
  created () {
    this.onload()
  }
}
</script>

<style lang="less" scoped>
.article {
  text-align: justify;
  text-justify: newspaper;
  // word-break: break-all;
  word-wrap: break-word;
  margin-top: 68px;
  padding: 0 20px;
  .article-title {
    font-size: 26px;
    font-weight: bold;
  }
  .article-content {
    font-size: 16px;
  }
}
</style>
