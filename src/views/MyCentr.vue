<template>
<!--个人中心页面===========================================================================================================-->
  <div>
    <div class="ding" v-if="states">
      <div class="left" >
        <van-image
        round
        width="4rem"
        height="4rem"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      </div>
      <div class="left" style="margin-top: 10px">
        {{username1}}
      </div>
          <!--图片-->
    </div>
    <div class="ding" v-else style="color: aliceblue" @click="goLlogin" >
      <van-image
        round
        width="4rem"
        height="4rem"
        :src="img"
      />
      登录/注册
    </div>
    <!--下面的导航-->
    <van-row class="user-links">
      <van-col span="6">
        <van-icon name="pending-payment" />
        待付款
      </van-col>
      <van-col span="6">
        <van-icon name="records" />
        待接单
      </van-col>
      <van-col span="6">
        <van-icon name="tosend" />
        待发货
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" />
        已发货
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell icon="records" title="全部订单" is-link />
    </van-cell-group>

    <van-cell-group>
      <van-cell icon="points" title="我的积分" is-link />
      <van-cell icon="gold-coin-o" title="我的优惠券" is-link />
      <van-cell icon="gift-o" title="我收到的礼物" is-link />
    </van-cell-group>
  </div>
</template>

<script>
  import axios from 'axios';
  import store from '@/store';

  export default {
    name: 'MyCentr',
    store,
    data(){
      return{
        username1:store.state.users,
        states:true,
        img: require('../assets/logo.png')
      }
    },
    methods:{
      getUser(){
        console.log("进来了1")
        console.log(store.state.users)
        if (store.state.users){
          console.log("进来了2")
          this.states=false;
        }
      },
      goLlogin(){
    this.$router.push({
      path:'/login'
    })
      }
    },
    activated:function () {
      this.getUser()
    }
  };
</script>

<style lang="less" scoped>
  .ding{
    width: 100%;
    height:8rem;
    background-color: #f37d0f;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .left{
    display: flex;
    justify-content: center;
    align-items: center;
    color: aliceblue;
  }


  .user {
    &-poster {
      width: 100%;
      height: 53vw;
      display: block;
    }
    &-group {
      margin-bottom: 15px;
    }
    &-links {
      padding: 15px 0;
      font-size: 12px;
      text-align: center;
      background-color: #fff;
      .van-icon {
        display: block;
        font-size: 24px;
      }
    }

  }
</style>
