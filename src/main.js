import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
//添加懒加载的全局引入
import {Lazyload} from 'vant';
//商品卡片的加载
import {Card} from 'vant';
//弹出框的加载
import { Dialog } from 'vant';
//引入下拉菜单
import { DropdownMenu, DropdownItem } from 'vant';
//引入通知提醒
import { Notify } from 'vant';
//引入搜索栏
import { Search } from 'vant';
//粘性布局
import { Sticky } from 'vant';
//List列表
import { List } from 'vant';
//引入侧边导航
import { Sidebar, SidebarItem } from 'vant';



import 'vant/lib/index.css';
import Vant from 'vant';


Vue.use(Vant);

Vue.config.productionTip = false;
//商品卡片的加载
Vue.use(Card);
//添加懒加载的全局引入
Vue.use(Lazyload);
//弹出框的加载
Vue.use(Dialog);
//引入下拉菜单
Vue.use(DropdownMenu).use(DropdownItem);
//引入通知提醒
Vue.use(Notify);
//引入搜索栏
Vue.use(Search);
//粘性布局
Vue.use(Sticky);
//List列表
Vue.use(List);
//引入侧边导航
Vue.use(Sidebar);
Vue.use(SidebarItem);


// Vue.use(Lazyload, {
//   preLoad: 1.3,
//   error: 'static/img/error.jpg',
//   loading: 'static/img/loading.gif',
//   attempt: 3
// })

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
