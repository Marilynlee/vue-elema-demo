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
@import "../../common/stylus/mixin.styl";

.img-text
  &.img-12-nobg
    .icon
      img-icon(12px, 4px, '1')
    .text
      img-text(14px, 10px)
  &.img-12-bg
    .icon
      img-icon(12px, 2px, '3')
    .text
      img-text(12px, 12px)
  &.img-16-nobg
    .icon
      img-icon(16px, 6px, '2')
    .text
      img-text(16px, 12px)
  &.img-16-bg
    .icon
      img-icon(16px, 6px, '4')
    .text
      img-text(16px, 12px)
</style>
