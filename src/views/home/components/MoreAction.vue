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
      <van-cell v-for="item in reportList" :key="item.type" @click="handleMore('report',item.type)">{{item.title}}</van-cell>
    </van-cell-group>
  </van-dialog>
</template>

<script>
import { dislikeArt, reportArt } from '@/api/article'
import { blackLists } from '@/api/user'
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
      showReport: false,
      // 举报列表
      reportList: [
        { title: '标题夸张', type: 1 },
        { title: '低俗色情', type: 2 },
        { title: '错别字多', type: 3 }
      ]
    }
  },
  methods: {
    // 操作更多
    handleMore (handle, reportType) {
      switch (handle) {
        // 点击不感兴趣
        case 'dislike': this.handleDislike()
          break
        // 点击拉黑作者
        case 'blackList': this.handleBlackList()
          break
        // 点击举报文章
        case 'report': this.handleReport(reportType)
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
    async handleBlackList () {
      try {
        await blackLists(this.article.aut_id)
        this.$toast.success('操作成功')
        // 操作成功后，通知父组件，父组件隐藏弹出层，并且将该作者所有的文章从列表中删除
        this.$emit('handleBlackList')
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    },
    // 举报文章
    async handleReport (reportType) {
      try {
        await reportArt({ target: this.article.art_id, type: reportType })
        this.$toast.success('举报成功')
        // 通知父组件隐藏弹出层
        this.$emit('input', false)
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style>
</style>
