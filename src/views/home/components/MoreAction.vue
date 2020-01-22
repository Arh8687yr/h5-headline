<template>
  <!-- 不能使用v-model控制弹出框的显隐，因为props是单向的 -->
  <!-- 当组件input事件触发，说明要去更改value值 -->
  <van-dialog
    :value="value"
    @input="$emit('input',$event)"
    closeOnClickOverlay
    :showConfirmButton="false"
  >
    <van-cell-group v-show="!showReport">
      <van-cell icon="location-o" @click="handleMore('dislike')">不感兴趣</van-cell>
      <van-cell icon="location-o" is-link @click="showReport=true">反馈垃圾内容</van-cell>
      <van-cell icon="location-o" @click="handleMore('blackList')">拉黑作者</van-cell>
    </van-cell-group>
    <!-- 垃圾内容选项 -->
    <van-cell-group v-show="showReport">
      <van-cell>
        <van-icon name="arrow-left" @click="showReport=false" />
      </van-cell>
      <van-cell>标题夸张</van-cell>
      <van-cell>低俗色情</van-cell>
      <van-cell>错别字多</van-cell>
    </van-cell-group>
  </van-dialog>
</template>

<script>
import { dislikeArt } from '@/api/article'
export default {
  name: 'moreAction',
  // 控制弹出框显隐,
  props: {
    value: {
      type: Boolean,
      required: true
    },
    // 父组件传来的当前的文章对象
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      // 控制举报内容的显隐
      showReport: false
    }
  },
  methods: {
    // 操作更多
    handleMore (handle) {
      switch (handle) {
        // 点击不感兴趣
        case 'dislike': this.handleDislike()
          break
        // 点击拉黑作者
        case 'blackList': this.handleBlackList()
      }
    },
    // 不感兴趣
    async handleDislike () {
      try {
        await dislikeArt(this.article.art_id)
        this.$toast.success('操作成功')
        // 操作成功后，通知父组件，父组件隐藏弹出层，并且将该条文章从显示列表中删除
        this.$emit('handleDislike')
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    },
    // 拉黑作者
    handleBlackList () {

    }
  }
}
</script>

<style>
</style>
