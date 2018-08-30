// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import resource from './resource';
import './common/stylus/index.styl';
import { formatDate } from './common/js/date';

Vue.config.productionTip = false;

Vue.filter('formatDate', function (value) {
  if (!value) return '';
  value = new Date(value);
  return formatDate(value, 'yyyy-MM-dd hh:mm');
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  resource,
  components: { App },
  template: '<App/>'
});
