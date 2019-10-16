<template>
  <div class="home">
    <!--登录页面=========================================================================================-->
    <!--标题栏-->
    <van-nav-bar
      title="登录"
      left-text="返回"
      right-text="注册新用户"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      id="van-nav-bar"
    />
    <!--设置图标-->
    <van-image
      round
      fit="cover"
      width="6rem"
      height="6rem"
      :src="imgsList[2]"
      id = "van-image"
    />
    <!--账户密码框-->
    <van-cell-group>
      <van-field
        v-model="username"
        :required="uum"
        :clearable="nnm"
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('请输入用户名')"
        class="van-field"

      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        :clearable="nnm"
        :required="uum"
        right-icon="question-o"
        @click-right-icon="$toast('请输入密码')"
        class="van-field"
      />

    </van-cell-group>
    <van-button type="primary"
                size="large"
                color="#FF6B00"
                :round="nnm"
                id="an"
                @click="tz"
    >登 录</van-button>
    <div id="wjmm">
      <span @click="forgetPassword">忘记密码</span>
    </div>
    <!--底部分割线段-->
    <van-divider :style="{
                  color: '#C7C7C7',
                  borderColor: '#C7C7C7',
                  padding: '14px 27px'}">其他登录方式</van-divider>


    <van-image

      fit="contain"
      width="1.5rem"
      height="1.5rem"
      :src='imgsList[0]'
      id = "van-image"

    />
    <van-image

      fit="contain"
      width="1.5rem"
      height="1.5rem"
      :src="imgsList[1]"
      id = "van-image"
    />

    <!--<ul>-->
      <!--<li v-for="(user,index) in datauser" :key="index">-->
        <!--{{user}}-->
      <!--</li>-->
    <!--</ul>-->
  </div>
</template>

<script>
  //在这个页面引入传输数据的Axios的组件
import axios from 'axios';
import store from '@/store';

export default {
  //定义名字
  name: 'login',
  //声明store
  store,
  //定义的变量
  data(){
    return{
      nnm:true,
      uum:false,
      username:'',
      password:'',
      cw:'',
      //传输数据的容器
      datauser:'',
      // datauser:''
      //图片数组
      imgsList:[
        require('../imgs/QQ.png'),
        require('../imgs/微信.png'),
        require('../assets/logo.png')

      ]
    }
  },
  //定义的方法
  methods:{
    //定义登录按钮的点击事件
    tz(){
      //提前设置变量,this_是方法中设置的，this是指代的是整体
      var this_ = this;

      //定义定义存放值得函数
      var params = new URLSearchParams();
      //讲函数放入其中
      params.append('username',this.username);
      params.append('password',this.password);
      //使用axios.post向后端发送请求
      axios.post('/portal/user/login.do',params)
        .then(function (datas) {
          //输出到页面，已注释
          // this_.datauser=datas.data.data
          if (datas.data.status !== 200){
            //设置错误信息
           var a =  (datas.data.msg)
            this_.cw = a ;
            //弹出数据
            this_.$dialog.alert({
              message: this_.cw
            });
            //输出到控制台
            // console.log(datas.data);
          } else {
            // this_.$router.push('/about',this_.datauser)
            //打印到控制台
            console.log(datas.data);
            //赋值给状态管理,全局保存
            store.state.users = datas.data.data;
            //改变地址栏的状态
            store.state.navigation = true
            console.log( store.state.users);
            //把成功的数据进行赋值
            this_.datauser = datas.data.data;
            //登录成功使用路由转发
            this_.$router.push({
              //跳转的路径
              path:'/',
              //携带的数据
              query:{da:this_.datauser}
            })
          };

        })
      // this.$router.push("/info")
    },
    //导航栏点击方法
      onClickLeft() {
        store.state.navigation = true
        this.$router.push({
          path:'/'
        })
        },
    //加入购物车的方法
     onClickRight() {
        this.$router.push({
          path:'/register'
        })
      },

    forgetPassword(){
      this.$router.push({
        path:'/forgetPsw'
      })
    }
    },
  activated:function () {
    store.state.navigation = false
  }

};
</script>
<style scoped>
  #an{
    margin-top: 10px;
    width: 90%;
  }
  #van-image{
    margin: 15px;
  }
  #van-nav-bar{
    height: 16%;
    color: black;
  }
  .van-field{
    margin-top: 5px;
  }
  #wjmm{
    display: flex;
    /*justify-items: right;*/
    justify-content: center;
    margin-top: 10px;
  }

</style>
