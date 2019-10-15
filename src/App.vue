<template>
  <div id="app">

      <!--&lt;!&ndash;路由定位到指定地点&ndash;&gt;-->
      <router-link to="/"></router-link>
      <!--<router-link to="/about">About</router-link>|-->
      <!--<router-link to="/info">Info</router-link>-->

    <!--将数据加载到缓存当中-->
    <keep-alive>
      <router-view/>
    </keep-alive>

    <van-tabbar
      v-model="active"
      active-color="#FF6B00"
      inactive-color="#000"
      id = "dh"
    >
      <van-tabbar-item icon="wap-home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="orders-o" to="/forgetPsw">分类</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/myCentr">{{ddh}}我的</van-tabbar-item>
    </van-tabbar>
    <!--&lt;!&ndash;打开路由&ndash;&gt;-->
    <!--<router-view/>-->
  </div>
</template>
<script>

  import store from '@/store';

  export default {
    name:'App',
    store,
    data(){
      return{
        ddh:'',
        active:'',
        tabType:'',

      }
    },
    methods:{
    },
    //在页面加载的时候就执行
    activated:function () {
      this.ddh=this.store.state.navigation;
    }
  }

</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  #dh{
    background-color: #F2F2F2;
  }
</style>
