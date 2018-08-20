<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0"  @click="deleteCart">
        <span class="icon-remove_circle_outline inner"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    created() {
//      this.food.count = 0;
    },
    methods: {
      addCart() {
        console.log('add');
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        // 子组件向父组件注册一个事件，并传参
        this.$emit('cartAdd', event.target);
      },
      deleteCart() {
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .cartcontrol-wrapper
    font-size: 0
    .cart-decrease
      display :inline-block
      padding: 6px
      .inner
        display :inline-block
        font-size: 24px
        line-height: 24px
        color:rgb(0,160,220)
        transition: all .4s linear
      &.move-enter-active,&.move-leave-active
        transition: all .4s linear
      &.move-enter, &.move-leave-to
        opacity: 0
        transform: translate3d(24px,0,0)
        .inner
          transform:rotate(180deg)
    .cart-count
      display :inline-block
      line-height: 24px
      width: 15px
      padding: 6px 0 0 0
      font-size: 10px
      vertical-align :top
      color:rgb(147,153,159)
      text-align :center
    .cart-add
      display :inline-block
      padding: 6px
      font-size: 24px
      line-height: 24px
      color:rgb(0,160,220)
</style>
