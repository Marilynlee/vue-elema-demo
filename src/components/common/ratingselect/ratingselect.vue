<template>
<div class="ratingselect">
  <div class="rating-type border-1px">
    <span @click="select(2,$event)" class="block positive" :class="{'active':checkType===2}">{{properties.desc.all}}<span class="count">{{ratings.length}}</span></span>
    <span @click="select(0,$event)" class="block positive" :class="{'active':checkType===0}">{{properties.desc.positive}}<span class="count">{{positives.length}}</span></span>
    <span @click="select(1,$event)" class="block negative" :class="{'active':checkType===1}">{{properties.desc.negative}}<span class="count">{{negatives.length}}</span></span>
  </div>
  <div @click="toggleCont" class="switch" :class="{'on':onlyCont===true}">
    <span class="icon icon-check_circle"></span><span class="text">只看有内容的评价</span>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    properties: {
      type: Object,
      default() {
        return {
          selectType: ALL,
          onlyContent: false,
          desc: {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        };
      }
    }
  },
  data() {
    return {
      checkType: this.properties.selectType,
      onlyCont: this.properties.onlyContent
    };
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE;
      });
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE;
      });
    }
  },
  methods: {
    select(type, event) {
      this.checkType = type;
      this.$emit('ratingType', type);
    },
    toggleCont() {
      this.onlyCont = !this.onlyCont;
      this.$emit('onlyContType', this.onlyCont);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "~@stylus/mixin.styl";
.ratingselect
  .rating-type
    padding: px2rem(18px) 0
    margin: 0 px2rem(18px)
    font-size: 0
    border-1px(rgba(7,17,27,0.1))
    .block
      display :inline-block
      padding: px2rem(8px) px2rem(12px)
      border-radius: px2rem(2px)
      margin-right: px2rem(8px)
      line-height: px2rem(16px)
      font-size: px2rem(12px)
      color: rgb(77,85,93)
      &.active
        color: #fff
      .count
        font-size: 8px
        margin-left: 2px
      &.positive
        background: rgba(0,160,220,0.2)
        &.active
          background: rgb(0,160,220)
      &.negative
        background: rgba(77,85,93,0.2)
        &.active
          background: rgb(77,85,93)

  .switch
    padding: px2rem(12px) px2rem(18px)
    line-height: px2rem(24px)
    border-bottom:1px solid rgba(7,17,27,0.1);
    color :rgb(147,153,159)
    font-size: 0
    &.on
      .icon
        color:#00c850
    .icon
      margin-right: px2rem(4px)
      font-size: px2rem(24px)
    .text
      display: inline-block
      vertical-align: top
      font-size: px2rem(12px)
</style>
