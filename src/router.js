import Vue from 'vue';
import Router from 'vue-router';
//引入Home的组件
import Home from './views/Home.vue'
//引入Login得组件
import Login from './views/Login.vue';
//引入info组件
import Info from './views/Info';
//引入注册组件
import Register from './views/Register'
//引入忘记密码的组件
import ForgetPsw from './views/ForgetPsw'
//引入商品详情的组件
import ProductDetail from './views/ProductDetail'
//引入购物车组件
import Cart from './views/Cart'
//引入个人中心组件
import MyCentr from './views/MyCentr'
//引入分类的组件
import Classify from './views/Classify'


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  /* 对应的第一个路由 */
  routes: [
    {
      //根路径
      path: '/',
      //名字对应得
      name: 'home',
      //引入组件，组件咋上面
      component: Home,
    },
    {
      //根路径
      path: '/cart',
      //名字对应得
      name: 'cart',
      //引入组件，组件咋上面
      component: Cart,
    },
    {
      //根路径
      path: '/classify',
      //名字对应得
      name: 'classify',
      //引入组件，组件咋上面
      component: Classify,
    },
    {
      //根路径
      path: '/myCentr',
      //名字对应得
      name: 'myCentr',
      //引入组件，组件咋上面
      component: MyCentr,
    },
    {
      //根路径
      path: '/login',
      //名字对应得
      name: 'login',
      //引入组件，组件咋上面
      component: Login,
    },
    {
      //根路径
      path: '/productDetail',
      //名字对应得
      name: 'productDetail',
      //引入组件，组件咋上面
      component: ProductDetail,
    },
    {
      //根路径
      path: '/forgetPsw',
      //名字对应得
      name: 'forgetPsw',
      //引入组件，组件咋上面
      component: ForgetPsw,
    },

    {
      //根路径
      path: '/register',
      //名字对应得
      name: 'register',
      //引入组件，组件咋上面
      component: Register,
    },
    //第二个路由指向得是Info
    {
      //根路径
      path: '/info',
      //名字对应得
      name: 'info',
      //引入组件，组件对应上面引入的名称上面
      component: Info,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //下面使用的是懒加载的方式
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
