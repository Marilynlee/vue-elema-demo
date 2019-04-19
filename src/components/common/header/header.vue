<template>
  <div class="header">
    <div class="content-wrap">
      <div class="avatar">
        <img :src="seller.avatar" alt="avatar"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <imgText :pros="{show:'true',size:'12',type:seller.supports[0].type,bg:'nobg',text:seller.supports[0].description}"></imgText>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrap" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="bg" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="support" v-if="seller.supports">
              <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
                <imgText :pros="{show:true,size:'16',type:item.type,bg:'nobg',text:item.description}"></imgText>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <p class="bulletin">{{seller.bulletin}}</p>
          </div>
        </div>
        <div class="detail-close" @click="showDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  import star from '@components/common/star/star.vue';
  import imgText from '@components/common/imgText/imgText.vue';
  const ERR_OK = 0;
  export default {
    components: {
      star,
      imgText
    },
    data() {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail() {
        this.detailShow = !this.detailShow;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/seller').then((response) => {
          response = response.body;
          if (response.errno === ERR_OK) {
            const sellerInfo = response.data;
            return this.$store.dispatch('getSellerInfo', {sellerInfo});
          }
        });
    },
    computed: {
      ...mapState({
        seller: state => state.sellerInfo
      })
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "~@stylus/mixin"

  .header
    position: relative
    color: #fff
    background-color: rgba(7, 17, 27, 0.5)
    overflow: hidden
    .content-wrap
      position: relative
      padding: px2rem(24px) px2rem(12px) px2rem(18px) px2rem(24px)
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        img
          width: px2rem(64px)
          height :px2rem(64px)
          border-radius: px2rem(2px)
      .content
        display: inline-block
        margin-left: px2rem(16px)
        .title
          margin: px2rem(2px) 0 px2rem(8px) 0
          .brand
            display: inline-block
            width: px2rem(30px)
            height: px2rem(18px)
            bg-image('brand')
            background-size: px2rem(30px) px2rem(18px)
            background-repeat: no-repeat
          .name
            margin-left: px2rem(6px)
            font-size: px2rem(16px)
            line-height: px2rem(18px)
            font-weight: bold
            vertical-align: top
        .description
          margin-bottom: px2rem(10px)
          line-height: px2rem(12px)
          font-size: px2rem(12px)
      .support-count
        position: absolute
        right: px2rem(12px)
        bottom: px2rem(14px)
        padding: px2rem(8px)
        height: px2rem(16px)
        line-height: px2rem(16px)
        border-radius: px2rem(14px)
        background-color: rgba(0, 0, 0, 0.2)
        text-align: center
        .count
          font-size: px2rem(10px)
          vertical-align: top
        .icon-keyboard_arrow_right
          margin-left: px2rem(2px)
          font-size: px2rem(10px)
          line-height: px2rem(16px)
    .bulletin-wrap
      position: relative
      height: px2rem(28px)
      padding: 0 px2rem(22px) 0 px2rem(12px)
      line-height: px2rem(28px)
      white-space: nowrap
      // overflow: hidden
      // text-overflow: ellipsis
      background-color: rgba(7, 17, 27, 0.1)
      font-size: px2rem(10px)
      .bulletin-title
        display: inline-block
        width: px2rem(22px)
        height: px2rem(28px)
        bg-image('bulletin')
        background-size: px2rem(22px) px2rem(12px)
        background-repeat: no-repeat
        background-position: 0 px2rem(7px)
      .bulletin-text
        display: inline-block;
        width :calc(100% - 32px)
        margin: 0 px2rem(20px) 0 px2rem(4px)
        vertical-align: top
        overflow: hidden
        white-space: nowrap;
        text-overflow: ellipsis;
      .icon-keyboard_arrow_right
        position: absolute
        top: px2rem(8px)
        right: px2rem(12px)
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)

    .detail
      display: flex
      flex-flow: column
      position: fixed
      z-index: 100
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow: auto
      background: rgba(7, 17, 27, 0.8)
      backdrop-filter:blur(10px)
      &.fade-enter-active, &.fade-leave-active
        transition: all .5s ease;
      &.fade-enter, &.fade-leave-to
        opacity: 0
        background: rgba(7,17,27,0)
      .detail-wrapper
        flex: 1
        .detail-main
          width: 80%
          margin: px2rem(64px) auto px2rem(32px)
          .name
            line-height: px2rem(16px)
            font-size: px2rem(16px)
            font-weight: 700
            text-align: center
          .star-wrapper
            margin-top: px2rem(16px)
            padding: px2rem(2px) 0
            text-align: center
          .title
            display: flex
            align-items: center
            margin: px2rem(28px) auto px2rem(24px)
            .line
              flex: 1
              border-bottom: 1px solid rgba(255, 255, 255, 0.2)
            .text
              padding: 0 px2rem(12px)
              font-size: px2rem(14px)
              font-weight: 700
          .support
            .support-item
              padding: 0 px2rem(12px)
              margin-bottom: px2rem(12px)
              font-size: 0
          .bulletin
            margin-top: px2rem(24px)
            padding: 0 px2rem(12px)
            line-height: px2rem(24px)
            font-size: px2rem(12px)
            font-weight: 200
      .detail-close
        width: px2rem(32px)
        height: px2rem(32px)
        margin: 0 auto px2rem(32px)
        font-size: px2rem(32px)
</style>
