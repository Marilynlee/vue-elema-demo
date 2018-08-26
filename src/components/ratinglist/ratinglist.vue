<template>
<div class="rating">
  <ul v-if="props.ratings && props.ratings.length">
    <li v-for="(item,index) in props.ratings" :key="index" class="rating-item"></li>
  </ul>
  <div v-else>暂无评论！</div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">

</style>
