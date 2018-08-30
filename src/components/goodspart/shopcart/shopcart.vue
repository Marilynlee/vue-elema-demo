<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div v-show="totalCount>0" class="num">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" v-if="totalPrice === 0">
          <div class="pay">￥{{minPrice}}起送</div>
        </div>
        <div class="content-right" v-else-if="this.totalPrice > 0 && this.totalPrice < this.minPrice">
          <div class="pay">还差￥{{this.minPrice - this.totalPrice}}起送</div>
        </div>
        <div class="content-right" v-else-if ="totalPrice >= minPrice" @click.stop.prevent="pay">
          <div class="pay highlight">去结算</div>
        </div>
      </div>
      <div class="ball-container">
        <transition-group tag="p" name="drop" v-on:before-enter="beforeEnter" v-on:enter="enter"
                          v-on:after-enter="afterEnter">
          <div class="ball" v-for="(ball,index) in balls" :key="index" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition-group>
      </div>
      <transition name="fold">
        <div v-show="listShow" class="shopcart-list">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clear">清空</span>
          </div>
          <div class="list-content" ref="cartListContent">
            <ul>
              <li class="food" v-for="(food,index) in selectFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideMask"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartcontrol from '@components/common/cartcontrol/cartcontrol.vue';
  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true
      };
    },
    components: {
      cartcontrol
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      listShow: {
        get: function () {
          return !this.fold;
        },
        set: function (param) {
          if (!param) {
            return false;
          }
          // 勾选商品本来为隐藏状态，现在展开
          if (param > 0 && this.fold) {
            this.fold = !this.fold;
            this.$nextTick(() => {
              if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.cartListContent, {
                  click: true
                });
              } else {
                this.scroll.refresh();
              }
            });
            return true;
          }
          // 勾选商品本来为显示状态，现在隐藏
          if (param > 0 && !this.fold) {
            this.fold = !this.fold;
            return false;
          }
        }
      }
    },
    methods: {
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeEnter: function (el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
            el.style.transform = `translate3d(0, ${y}px, 0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
            inner.style.transform = `translate3d(${x}px, 0, 0)`;
          }
        }
      },
      enter: function (el) {
        /* 手动重绘 */
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = `translate3d(0, 0, 0)`;
          el.style.transform = `translate3d(0, 0, 0)`;
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(0, 0, 0)`;
          inner.style.transform = `translate3d(0, 0, 0)`;
        });
      },
      afterEnter: function (el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      toggleList() {
        this.listShow = this.totalCount;
      },
      clear() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      hideMask() {
        this.fold = false;
        this.listShow = this.totalCount;
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return false;
        }
        window.alert(`支付￥${this.totalPrice}元！`);
      }
    },
    watch: {
      // 在购物车把物品删除完时，需要自动隐藏列表
      totalCount: function(newVal) {
        if (!newVal) {
          this.fold = true;
          this.listShow = this.totalCount;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "~@stylus/mixin.styl";
  @keyframes slide-move {
    from {
      transform: translate3d(0, 0%, 0)
    }
    to {
      transform: translate3d(0, -100%, 0)
    }
  }
  .shopcart
    position: fixed
    bottom: 0
    left: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2B343C
            &.highlight
              background: rgb(0, 160, 220)
            .icon
              font-size: 24px
              line-height: 44px
              color: #80858A
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: rgb(255, 255, 255)
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          line-height: 24px
          margin-top: 12px
          margin-left: 12px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          background: #2B333B
          &.highlight
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all .4s linear
        &.drop-enter-active
          transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
    .shopcart-list
      position: absolute
      width: 100%
      left: 0
      top: 0
      z-index: -1
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active
        animation: slide-move .5s linear
      &.fold-leave-active
        animation: slide-move .5s reverse
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        padding: 0 18px
        max-height: 217px
        background: #fff
        overflow: hidden
        .food
          position: relative;
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            bottom: 6px
            right: 0
  .list-mask
    position :fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    z-index :40
    background :rgba(7,17,27,0.6)
    backdrop-filter: blur(10px)
    &.fade-enter-active,&.fade-leave-active
      transition: all .5s
    &.fade-enter,&.fade-leave-to
      opacity: 0
      background :rgba(7,17,27,0)
</style>