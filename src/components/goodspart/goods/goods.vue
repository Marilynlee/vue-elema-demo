<template>
  <div class="goods">
    <div ref="menu">
      <ul class="menu-wrapper  border-1px">
        <li v-for="(item, index) in goods" :key="index" class="menu-item" :class="{current:index===curIndex}"
            @click="selectMenu($event,index)">
          <imgText class=" border-1px" :pros="{show:item.type>0,size:'12',type:item.type,bg:'bg',text:item.name}"></imgText>
        </li>
      </ul>
    </div>
    <div class="foots-wrapper" ref="foods">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="food-list foodListHook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food,num) in item.foods" class="food-item border-1px" :key="num" @click="checkFood(food,$event)">
              <div class="icon">
                <img width="57" height="57" alt="food-img" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span v-show="food.oldPrice"
                                                                class="old">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" :key="num" @cartAdd="cartAdd"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></shopcart>
    <food :food="checkedFood" ref="food" @cartAdd="cartAdd"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import imgText from '@components/common/imgText/imgText.vue';
  import BScroll from 'better-scroll';
  import shopcart from '@components/goodspart/shopcart/shopcart.vue';
  import cartcontrol from '@components/common/cartcontrol/cartcontrol.vue';
  import food from '@components/goodspart/food/food.vue';

  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      imgText,
      shopcart,
      cartcontrol,
      food
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        checkedFood: {}
      };
    },
    computed: {
      curIndex() {
//        console.log('computed');
        for (let i = 0; i < this.listHeight.length; i++) {
          let heightA = this.listHeight[i];
          let heightB = this.listHeight[i + 1];
          if ((this.scrollY >= heightA && this.scrollY < heightB) || (!heightB)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created() {
      console.log('created');
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
//        console.log('get response: ', response);
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          console.log('get goods: ', this.goods);
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
    },
    methods: {
      _initScroll() {
        let that = this;
        /* 使用bScroll时，注意wrapper里面滚动的元素只能是一个，所以不能传入ul，需要在ul外包裹一层div让ul滚动 */
        this.menuScroll = new BScroll(this.$refs.menu, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foods, {
          probeType: 3,
          click: true
        });
        this.foodsScroll.on('scroll', (pos) => {
          that.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        // 获取每个分类dom
        let foodList = this.$refs.foods.getElementsByClassName('foodListHook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          // 每个分类dom高度放入listHeight数组
          this.listHeight.push(height);
        }
      },
      selectMenu(event, index) {
        console.log(index, event);
        let foodList = this.$refs.foods.getElementsByClassName('foodListHook');
        // 通过点击左侧栏的index，关联右侧展示的分类
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      cartAdd(el) {
        // 父组件使用v-on:event监听子组件的注册事件，并进行处理
        this.$nextTick(() => {
          // 调用shopcart组件的drop()函数
          this.$refs['shopcart'].drop(el);
        });
      },
      checkFood(food, event) {
//        console.log(food, event);
        this.checkedFood = food;
        this.$refs.food.show();
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "~@stylus/mixin.styl";
  .goods
    display: flex
    position: absolute
    top: px2rem(174px)
    bottom: px2rem(46px)
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 px2rem(80px)
      width: px2rem(80px)
      background-color: #f3f5f7
      .menu-item
        display: table
        width: px2rem(54px)
        height: px2rem(56px)
        padding: 0 px2rem(12px)
        font-size: px2rem(12px)
        line-height: px2rem(14px)
        color: rgb(7, 17, 27)
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .img-text:after
            border: none
        .img-text
          display: table-cell
          vertical-align: middle;
          border-1px(rgba(7, 17, 27, 0.1))
          .text
            font-weight: 700
    .foots-wrapper
      flex: 1
      .title
        padding-left: px2rem(14px)
        height: px2rem(26px)
        line-height: px2rem(26px)
        border-left: px2rem(2px) solid #d9dde1
        color: rgb(147, 153, 159)
        background: #f3f5f7
        font-size: px2rem(12px)
      .food-item
        display: flex
        margin: px2rem(18px)
        padding-bottom: px2rem(18px)
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child:after
          border-top: none
        &:last-child
          padding-bottom: 0
        .icon
          flex: 0 0 px2rem(57px)
          margin-right: px2rem(10px)
        .content
          flex: 1
          width: 0
          .name
            margin: px2rem(2px) 0 px2rem(8px) 0
            height: px2rem(14px)
            line-height: px2rem(14px)
            font-size: px2rem(14px)
            font-weight: 700
            color: rgb(7, 17, 27)
          .desc
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
          .desc, .extra
            margin-bottom: px2rem(8px)
            line-height: px2rem(12px)
            font-size: px2rem(10px)
            color: rgb(147, 153, 159)
          .extra
            .count
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
            position: absolute
            bottom: px2rem(12px)
            right: 0
</style>
