<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect
        :properties="{selectType:selectType,onlyContent:onlyContent,desc:desc}"
        :ratings="ratings"
        @ratingType="ratingType"
        @onlyContType="onlyContType"
      ></ratingselect>
      <div class="ratings-wrapper">
        <ul>
          <li
            v-for="(rating, index) in ratings"
            :key="index"
            v-show="needShow(rating)"
            class="rating-item"
          >
            <div class="avatar">
              <img class="avatar-img" width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span v-show="rating.deliveryTime" class="delivery">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon icon-thumb_up"></span>
                <span class="item" v-for="(item, k) in rating.recommend" :key="k">{{item}}</span>
              </div>
              <div class="date">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from "better-scroll";
import star from "@components/common/star/star.vue";
import split from "@components/common/split/split.vue";
import ratingselect from "@components/common/ratingselect/ratingselect.vue";
import { mapState } from "vuex";

/* eslint-disable no-unused-vars */
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
const ERR_OK = 0;
export default {
  components: {
    star,
    ratingselect,
    split
  },
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: "全部",
        positive: "满意",
        negative: "不满意"
      }
    };
  },
  computed: {
    ...mapState(["seller", "ratings"])
  },
  created() {
    this.$store.dispatch("getRatingsInfo");
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.ratings, {
        click: true
      });
    });
  },
  methods: {
    needShow(item) {
      if (!item.text && this.onlyContent) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return item.rateType === this.selectType;
      }
    },
    ratingType(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    onlyContType(type) {
      this.onlyContent = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
@import '~@stylus/mixin.styl';

.ratings {
  position: absolute;
  top: px2rem(174px);
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;

  .overview {
    display: flex;
    padding: px2rem(18px) 0;

    .overview-left {
      flex: 0 0 px2rem(137px);
      width: px2rem(137px);
      padding: px2rem(6px) 0;
      border-right: 1px solid rgba(7, 17, 27, 0.1);
      text-align: center;

      @media only screen and (max-width: 320px) {
        flex: 0 0 px2rem(120px);
        width: px2rem(120px);
      }

      .score {
        margin-bottom: px2rem(6px);
        line-height: px2rem(28px);
        font-size: px2rem(24px);
        color: rgb(255, 153, 0);
      }

      .title {
        margin-bottom: px2rem(8px);
        line-height: px2rem(12px);
        font-size: px2rem(12px);
        color: rgb(7, 17, 27);
      }

      .rank {
        line-height: px2rem(10px);
        font-size: px2rem(10px);
        color: rgb(147, 153, 159);
      }
    }

    .overview-right {
      flex: 1;
      padding: 6px 0 px2rem(6px) px2rem(24px);

      @media only screen and (max-width: 320px) {
        padding-left: px2rem(12px);
      }

      .score-wrapper {
        margin-bottom: px2rem(8px);
        font-size: 0;

        .title {
          display: inline-block;
          line-height: px2rem(18px);
          color: rgb(7, 17, 27);
          font-size: px2rem(12px);
        }

        .star {
          display: inline-block;
          margin: 0 px2rem(12px);
          vertical-align: top;

          @media only screen and (max-width: 320px) {
            margin: 0 px2rem(6px);
          }
        }

        .score {
          display: inline-block;
          line-height: px2rem(18px);
          vertical-align: top;
          font-size: px2rem(12px);
          color: rgb(255, 153, 0);
        }
      }

      .delivery-wrapper {
        font-size: 0;

        .title {
          line-height: px2rem(18px);
          color: rgb(7, 17, 27);
          font-size: px2rem(12px);
        }

        .delivery-time {
          margin-left: px2rem(12px);
          color: rgb(147, 153, 159);
          font-size: px2rem(12px);

          @media only screen and (max-width: 320px) {
            margin-left: px2rem(6px);
          }
        }
      }
    }
  }

  .ratings-wrapper {
    padding: 0 px2rem(18px);

    .rating-item {
      display: flex;
      padding: px2rem(18px) 0;
      border-1px(rgba(7, 17, 27, 0.1));

      .avatar {
        flex: 0 0 px2rem(28px);
        width: px2rem(28px);
        margin-right: px2rem(12px);

        img {
          border-radius: 50%;
        }
      }

      .content {
        position: relative;
        flex: 1;

        .name {
          margin-bottom: px2rem(4px);
          line-height: px2rem(12px);
          font-size: px2rem(10px);
          color: rgb(7, 17, 27);
        }

        .star-wrapper {
          margin-bottom: px2rem(6px);
          font-size: 0;

          .star {
            margin-right: px2rem(6px);
            display: inline-block;
            vertical-align: top;
          }

          .delivery {
            display: inline-block;
            vertical-align: top;
            font-size: px2rem(10px);
            line-height: px2rem(12px);
            color: rgb(147, 153, 159);
          }
        }

        .text {
          margin-bottom: px2rem(8px);
          line-height: px2rem(18px);
          font-size: px2rem(12px);
          color: rgb(7, 17, 27);
        }

        .recommend {
          line-height: px2rem(16px);
          font-size: 0;

          .icon, .item {
            display: inline-block;
            margin: 0 px2rem(8px) px2rem(4px) 0;
            font-size: px2rem(9px);
          }

          .icon {
            color: rgb(0, 160, 220);
          }

          .item {
            padding: 0 px2rem(6px);
            border: 1px solid rgba(7, 17, 27, 0.1);
            border-radius: 1px;
            color: rgb(147, 153, 159);
            background: #fff;
          }
        }

        .date {
          position: absolute;
          top: 0;
          right: 0;
          line-height: px2rem(12px);
          font-size: px2rem(10px);
          color: rgb(147, 153, 159);
        }
      }
    }
  }
}
</style>
