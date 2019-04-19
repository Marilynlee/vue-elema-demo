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
        <div class="favorite" @click="toggleFavorite">
          <span class="icon icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
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
      <split></split>
      <div class="seller-pics">
        <h1 class="title">商家实景</h1>
        <div class="pics-wrapper" ref="picWrapper">
          <ul class="pics-list" ref="picList">
            <li class="pic-item" v-for="(pic, index) in seller.pics" :key="index">
              <img :src="pic" alt="img" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item" v-for="(info,index) in seller.infos" :key="index">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { saveToLocal, loadFromLocal } from '../../common/js/store';
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
      },
      id: {
        type: String
      }
    },
    components: {
      star,
      imgText,
      split
    },
    data() {
      return {
        favorite: loadFromLocal(this.id, 'favorite', false)
      };
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    /* beforeCreate() {
      console.log(this, 0);
    }, */
    created() {
      console.log(this.id, 1);
      this.$nextTick(() => {
        console.log(this.seller, 2);
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        });
        this._initPicScroll();
      });
    },
    methods: {
      _initPicScroll() {
        if (this.seller.pics) {
          console.log('methods');
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      },
      toggleFavorite() {
        this.favorite = !this.favorite;
        saveToLocal(this.id, 'favorite', this.favorite);
      }
    },
    /* beforeMount() {
      console.log(this.seller, 3);
      this.$nextTick(() => {
        console.log(this.seller, 4);
      });
    },
    mounted() {
      console.log(this.seller, 5);
      this.$nextTick(() => {
        console.log(this.seller, 6);
      });
    }, */
    beforeUpdate() {
      console.log(this.seller, 7);
      this._initPicScroll();
    }
    /* updated() {
      console.log(this.seller, 9);
      this.$nextTick(() => {
        console.log(this.seller, 10);
      });
    },
    beforeDestroy() {
      console.log(this.seller, 11);
      this.$nextTick(() => {
        console.log(this.seller, 12);
      });
    },
    destroyed() {
      console.log(this.seller, 13);
      this.$nextTick(() => {
        console.log(this.seller, 14);
      });
    } */
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "~@stylus/mixin.styl";
.seller
  position :absolute
  top: px2rem(174px)
  bottom: 0
  left: 0
  width: 100%
  overflow :hidden
  .overview
    position: relative
    padding: px2rem(18px) px2rem(18px) 0 px2rem(18px)
    .title
      margin-bottom: px2rem(8px)
      line-height: px2rem(18px)
      font-size: px2rem(14px)
      color:rgb(7,17,27)
    .desc
      padding-bottom: px2rem(18px)
      border-1px(rgba(7,17,27,0.1))
      font-size: 0
      .star
        display: inline-block
        margin-right: px2rem(8px)
        vertical-align: top
      .text
        display: inline-block
        margin-right: px2rem(12px)
        line-height: px2rem(18px)
        vertical-align: top
        font-size: px2rem(10px)
        color:rgb(77,85,93)
    .remark
      display: flex
      margin: px2rem(18px)
      .block
        flex:1
        text-align: center
        border-right:1px solid rgba(7,17,27,0.1)
        &:last-child
          border:none
        h2
          margin-bottom: px2rem(4px)
          font-size: px2rem(10px)
          line-height: px2rem(10px)
          color:rgb(147,153,159)
        .content
          line-height: px2rem(24px)
          font-size: px2rem(10px)
          color:rgb(7,17,27)
          .stress
            font-size:px2rem(24px)
    .favorite
      position: absolute
      width: px2rem(48px)
      top: px2rem(18px)
      right: px2rem(13px)
      text-align: center
      .icon
        display: block
        margin-bottom: px2rem(4px)
        line-height: px2rem(24px)
        font-size: px2rem(24px)
        color:#d4d6d9
        &.active
          color:rgb(240,20,20)
      .text
        position: absolute
        top: px2rem(28px)
        right: px2rem(14px)
        font-size: px2rem(10px)
        color:rgb(77,85,93)
  .bulletin
    padding:px2rem(18px) px2rem(18px) 0 px2rem(18px)
    .title
      margin-bottom: px2rem(8px)
      line-height: px2rem(18px)
      font-size: px2rem(14px)
      color:rgb(7,17,27)
    .content-wrapper
      padding:0 px2rem(12px) px2rem(16px) px2rem(12px)
      border-1px(rgba(7,17,27,0.1))
      .content
        line-height: px2rem(24px)
        font-size: px2rem(12px)
        color:rgb(240,20,20)
    .support
      .support-item
        padding: px2rem(16px) px2rem(12px)
        font-size: 0
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border:none
  .seller-pics
    padding: px2rem(18px)
    .title
      margin-bottom: px2rem(12px)
      line-height: px2rem(14px)
      font-size: px2rem(14px)
      color:rgb(7,17,27)
    .pics-wrapper
      width: 100%
      overflow: hidden
      white-space :nowrap
      .pics-list
        font-size: 0
        .pic-item
          display: inline-block
          margin-right: px2rem(6px)
          width: px2rem(120px)
          height: px2rem(90px)
  .info
    padding: px2rem(18px) px2rem(18px) 0 px2rem(18px)
    color:rgb(7,17,27)
    .title
      padding-bottom: px2rem(12px)
      line-height: px2rem(14px)
      border-1px(rgba(7,17,27,0.1))
      font-size: px2rem(14px)
    .info-item
      padding: px2rem(16px) px2rem(12px)
      line-height: px2rem(16px)
      border-1px(rgba(7,17,27,0.1))
      font-size: px2rem(12px)
      &:last-child
        border:none
</style>
