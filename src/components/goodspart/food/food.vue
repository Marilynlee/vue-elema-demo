<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="foodDetail">
      <div class="food-content">
        <div class="img-header">
          <img :src="food.image" alt="img">
          <div class="back" @click="hide">
            <i class="icon icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}</span>
            <span class="sell-rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food" @cartAdd="cartAdd"></cartcontrol>
          </div>
          <transition name="fade">
            <div @click.stop.prevent="addFood" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
          </transition>
        </div>
        <split  v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品介绍</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :properties="{selectType:selectType,onlyContent:onlyContent,desc:desc}" :ratings="food.ratings"
          @ratingType="ratingType" @onlyContType="onlyContType"></ratingselect>
          <div class="rating-wrapper">
            <ul v-if="food.ratings && food.ratings.length">
              <li v-for="(rating,index) in food.ratings" :key="index" v-show="needShow(rating)" class="rating-item">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar"/>
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div v-else class="no-rating">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import cartcontrol from '@components/common/cartcontrol/cartcontrol.vue';
  import split from '@components/common/split/split.vue';
  import ratingselect from '@components/common/ratingselect/ratingselect.vue';

  /* eslint-disable no-unused-vars */
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    components: {
      cartcontrol,
      ratingselect,
      split
    },
    methods: {
      show() {
        this.showFlag = true;
        this.seclectType = ALL;
        this.onlyContent = false;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.foodDetail, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      addFood() {
        this.$emit('cartAdd', event.target);
        Vue.set(this.food, 'count', 1);
      },
      cartAdd() {
        // cartcontrol组件内触发cartAdd事件无法直接传至good组件，需要在food组件再传递一次
        this.$emit('cartAdd', event.target);
      },
      ratingType(type) {
        this.selectType = type;
      },
      onlyContType(type) {
        this.onlyContent = type;
      },
      needShow(item) {
        if (!item.text && this.onlyContent) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return item.rateType === this.selectType;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "~@stylus/mixin.styl";
.food
  position :fixed
  left:0
  bottom: px2rem(48px)
  top: 0
  z-index :30
  width: 100%
  background: #fff
  transform: translate3d(0, 0, 0)
  &.move-enter-active, &.move-leave-active
    transition: all .2s linear
  &.move-enter, &.move-leave-to
    transform: translate3d(100%,0,0)
  .img-header
    position :relative
    width: 100%
    height: 0
    padding-top: 100%
    img
      position :absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
    .back
      position: absolute
      top: 10px
      left: 0
      .icon
        display: block
        padding: px2rem(10px)
        font-size: px2rem(20px)
        color:#fff
  .content
    position: relative;
    padding: px2rem(18px)
    .title
      line-height: px2rem(14px)
      margin-bottom: px2rem(8px)
      font-size: px2rem(14px)
      font-weight: 700
      color:rgb(7,17,27)
    .detail
      margin-bottom: px2rem(18px)
      line-height: px2rem(18px)
      height: px2rem(10px)
      font-size: 0
      .sell-count, .sell-rating
        font-size: px2rem(10px)
        color:rgb(147,153,159)
      .sell-count
        margin-right: px2rem(12px)
    .price
      font-weight: 700
      line-height: px2rem(24px)
      color: rgb(147, 153, 159)
      font-size: px2rem(10px)
      .now
        margin-right: px2rem(8px)
        font-size: px2rem(14px)
        color: rgb(240, 20, 20)
      .old
        text-decoration: line-through
    .cartcontrol-wrapper
      position :absolute
      right: px2rem(12px)
      bottom: px2rem(12px)
    .buy
      position :absolute
      right: px2rem(18px)
      bottom: px2rem(18px)
      z-index :10
      height: px2rem(24px)
      line-height: px2rem(24px)
      padding:0 px2rem(12px)
      box-sizing:border-box
      font-size: px2rem(10px)
      border-radius: px2rem(12px)
      color:#fff
      background: rgb(0,160,220)
      &.fade-enter-active, &.fade-leave-active
        transition: all .2s
      &.fade-enter, &.fade-leave-to
        opacity: 0
  .info
    padding: px2rem(18px)
    .title
      line-height: px2rem(14px)
      margin-bottom: px2rem(6px)
      font-size: px2rem(14px)
      font-weight: 700
      color:rgb(7,17,27)
    .text
      line-height: px2rem(24px)
      padding: 0 px2rem(8px)
      font-size: px2rem(12px)
      color:rgb(77,85,93)
  .rating
    padding-top: px2rem(18px)
    .title
      line-height: px2rem(14px)
      margin-left: px2rem(18px)
      font-size: px2rem(14px)
      font-weight: 700
      color:rgb(7,17,27)
    .rating-wrapper
      padding: 0 px2rem(18px)
      .rating-item
        position: relative
        padding: px2rem(16px) 0
        border-1px(rgba(7,17,27,0.1))
        .user
          position: absolute
          right: 0
          top: px2rem(16px)
          font-size: 0
          line-height: px2rem(12px)
          .name
            display: inline-block
            margin-right: px2rem(6px)
            vertical-align: top
            color:rgb(147,153,159)
            font-size: px2rem(10px)
          .avatar
            border-radius:50%
        .time
          margin-bottom: px2rem(6px)
          line-height: px2rem(12px)
          font-size: px2rem(10px)
          color:rgb(147,153,159)
        .text
          line-height: px2rem(16px)
          font-size: px2rem(12px)
          color:rgb(7,17,27)
          .icon-thumb_up,.icon-thumb_down
            line-height: px2rem(18px)
            margin-right: px2rem(4px)
            font-size: px2rem(12px)
            color:rgb(0,160,220)
          .icon-thumb_down
            color:rgb(147,153,159)
      .no-rating
        padding: px2rem(16px) 0
        font-size: px2rem(12px)
        color:rgb(147,153,159)
</style>
