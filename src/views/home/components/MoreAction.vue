<template>
  <van-dialog v-model="show" closeOnClickOverlay :showConfirmButton="false">
    <van-cell-group v-show="!showReport">
      <van-cell icon="location-o">不感兴趣</van-cell>
      <van-cell icon="location-o" is-link @click="showReport=true">反馈垃圾内容</van-cell>
      <van-cell icon="location-o">拉黑作者</van-cell>
    </van-cell-group>
    <!-- 垃圾内容选项 -->
    <van-cell-group v-show="showReport">
      <van-cell>
        <van-icon name="arrow-left" @click="showReport=false"/>
      </van-cell>
      <van-cell>标题夸张</van-cell>
      <van-cell>低俗色情</van-cell>
      <van-cell>错别字多</van-cell>
    </van-cell-group>
  </van-dialog>
</template>

<script>
export default {
  name: 'moreAction',
  data () {
    return {
      // 控制弹出框显隐
      show: true,
      // 控制举报内容的显隐
      showReport: false
    }
  }
}
</script>

<style>
</style>
