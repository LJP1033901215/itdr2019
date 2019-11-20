<template>
<!--个人中心页面===========================================================================================================-->
  <div>
    <div class="ding" v-if="bl">
      <div class="left" >
        <van-image
        round
        width="4rem"
        height="4rem"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      </div>
      <div class="left" style="margin-top: 10px">
        {{name}}
      </div>
          <!--图片-->
    </div>
    <div class="ding" v-else style="color: aliceblue" @click="goLlogin" >
      <van-image
        round
        width="4rem"
        height="4rem"
        :src="img"
        id="tb"
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

    <van-button type="primary"
                size="large"
                @click="esc"
                color="#FF6B00"
                id="an"
                v-if="bl"
                >退出账号</van-button>
    <!--<van-cell is-link @click="showPopup">展示弹出层</van-cell>-->
    <!--<van-popup-->
      <!--v-model="show"-->
      <!--position="right"-->
      <!--:style="{ width: '80px',height:'100%' }"-->
    <!--/>-->
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
        img:'https://i.loli.net/2019/11/10/qNuR2sjgX6nz7hr.jpg',
        show:false,

      }
    },
    methods:{
      showPopup(){
        this.show=true
      },
      //退出账号操作
      esc(){
        var this_ = this;
        axios.post('/portal/user/logout.do').
        then(function (datas) {
          if (datas.data.status !== 200){
            this_.$toast('退出失败');
          }else {
            store.state.users = '';
            this_.$toast('已退出账号');
            this_.$router.push({
              path:'/myCentr'
            })
          }
        })
      },
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
    },
    computed:{
      bl(){
        if (store.state.users!==''){
          return true
        }else {
          return false
        }
      },
      name(){
        if (store.state.users!==''){
          return store.state.users.username;
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  #an{
    position: fixed;
    bottom: 50px;
    left: 0;
  }
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
#tb{
  border: 2px white solid !important;
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
