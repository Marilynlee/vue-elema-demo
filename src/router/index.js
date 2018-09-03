import Vue from 'vue';
import Router from 'vue-router';
import goods from '@/components/goodspart/goods/goods';
import ratings from '@/components/ratings/ratings';
import seller from '@/components/seller/seller';

Vue.use(Router);

export default new Router({
  // linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: { name: 'goods' }
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/seller/:id',
      name: 'seller',
      props: true,
      component: seller
    },
    {
      path: '/seller',
      component: seller
    }
  ]
});
