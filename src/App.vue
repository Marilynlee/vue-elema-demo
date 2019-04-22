<template>
  <div>
    <v-header></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/common/header/header.vue';

  export default {
    data() {
      return {
        seller: {}
      };
    },
    components: {
      'v-header': header
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
@import "./common/stylus/mixin.styl"
    .tab
      display: flex
      width: 100%
      height: px2rem(40px)
      line-height: px2rem(40px)
      //border-bottom: solid 1px rgba(7, 17, 27, 0.1)
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          display: block
          font-size: px2rem(14px)
          color: rgb(77, 85, 93)
          &.router-link-active
            color:rgb(240, 20, 20)
</style>
