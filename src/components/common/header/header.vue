<template>
  <div class="header">
    <div class="content-wrap">
      <div class="avatar">
        <img :src="seller.avatar" alt="" width="64" height="64"/>
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
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span><i
      class="icon-keyboard_arrow_right"></i>
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
  import star from '@components/common/star/star.vue';
  import imgText from '@components/common/imgText/imgText.vue';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
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
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight: bold
            vertical-align: top
        .description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
      .support-count
        position: absolute
        right: 12px
        bottom: 14px
        padding: 08px
        height: 16px
        line-height: 16px
        border-radius: 14px
        background-color: rgba(0, 0, 0, 0.2)
        text-align: center
        .count
          font-size: 10px
          vertical-align: top
        .icon-keyboard_arrow_right
          margin-left: 2px
          font-size: 10px
          line-height: 16px
    .bulletin-wrap
      position: relative
      height: 28px
      padding: 0 22px 0 12px
      line-height: 28px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background-color: rgba(7, 17, 27, 0.1)
      .bulletin-title
        display: inline-block
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        margin: 0 4px
        font-size: 10px
        vertical-align: top
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        top: 8px
        right: 12px
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
          margin: 64px auto 32px
          .name
            line-height: 16px
            font-size: 16px
            font-weight: 700
            text-align: center
          .star-wrapper
            margin-top: 16px
            padding: 2px 0
            text-align: center
          .title
            display: flex
            align-items: center
            margin: 28px auto 24px
            .line
              flex: 1
              border-bottom: 1px solid rgba(255, 255, 255, 0.2)
            .text
              padding: 0 12px
              font-size: 14px
              font-weight: 700
          .support
            .support-item
              padding: 0 12px
              margin-bottom: 12px
              font-size: 0
          .bulletin
            margin-top: 24px
            padding: 0 12px
            line-height: 24px
            font-size: 12px
            font-weight: 200
      .detail-close
        width: 32px
        height: 32px
        margin: 0 auto 32px
        font-size: 32px
</style>
