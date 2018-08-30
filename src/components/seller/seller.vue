<template>
  <div ref="seller" class="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper  border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul class="support" v-if="seller.supports">
          <li class="support-item  border-1px" v-for="(item,index) in seller.supports" :key="index">
            <imgText :pros="{show:true,size:'16',type:item.type,bg:'nobg',text:item.description}"></imgText>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import star from '@components/common/star/star.vue';
  import split from '@components/common/split/split.vue';
  import imgText from '@components/common/imgText/imgText.vue';

  /* eslint-disable no-unused-vars */
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star,
      imgText,
      split
    },
    created() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        });
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "~@stylus/mixin.styl";
.seller
  position :absolute
  top: 174px
  bottom: 0
  left: 0
  width: 100%
  overflow :hidden
  .overview
    padding: 18px 18px 0 18px
    .title
      margin-bottom: 8px
      line-height: 18px
      font-size: 14px
      color:rgb(7,17,27)
    .desc
      padding-bottom: 18px
      border-1px(rgba(7,17,27,0.1))
      font-size: 0
      .star
        display: inline-block
        margin-right: 8px
        vertical-align: top
      .text
        display: inline-block
        margin-right: 12px
        line-height: 18px
        vertical-align: top
        font-size: 10px
        color:rgb(77,85,93)
    .remark
      display: flex
      margin: 18px
      .block
        flex:1
        text-align: center
        border-right:1px solid rgba(7,17,27,0.1)
        &:last-child
          border:none
        h2
          margin-bottom: 4px
          font-size: 10px
          line-height: 10px
          color:rgb(147,153,159)
        .content
          line-height: 24px
          font-size: 10px
          color:rgb(7,17,27)
          .stress
            font-size:24px
  .bulletin
    padding:18px 18px 0 18px
    .title
      margin-bottom: 8px
      line-height: 18px
      font-size: 14px
      color:rgb(7,17,27)
    .content-wrapper
      padding:0 12px 16px 12px
      border-1px(rgba(7,17,27,0.1))
      .content
        line-height: 24px
        font-size: 12px
        color:rgb(240,20,20)
    .support
      .support-item
        padding: 16px 12px
        font-size: 0
        border-1px(rgba(7,17,27,0.1))
</style>
