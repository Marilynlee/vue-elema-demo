<template>
  <div class="img-text" :class="iconType">
    <span v-show="pros.show" class="icon" :class="classMap[pros.type]"></span><span class="text">{{pros.text}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      pros: {
        type: Object
      }
    },
    computed: {
      iconType() {
        return `img-${this.pros.size}-${this.pros.bg}`;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
@import "~@stylus/mixin.styl";

.img-text
  &.img-12-nobg
    .icon
      img-icon(px2rem(12px), px2rem(4px), '1')
    .text
      img-text(px2rem(14px), px2rem(10px))
  &.img-12-bg
    .icon
      img-icon(px2rem(12px), px2rem(2px), '3')
    .text
      img-text(px2rem(12px), px2rem(12px))
  &.img-16-nobg
    .icon
      img-icon(px2rem(16px), px2rem(6px), '2')
    .text
      img-text(px2rem(16px), px2rem(12px))
  &.img-16-bg
    .icon
      img-icon(px2rem(16px), px2rem(6px), '4')
    .text
      img-text(px2rem(16px), px2rem(12px))
</style>
