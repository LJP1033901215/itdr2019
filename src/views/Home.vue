<template >
    <div id="app1">
      <!--吸顶操作-->
      <van-sticky :offset-top="0">
          <!--搜索框-->
          <van-search
            id="ssk"
            v-model="value"
            placeholder="请输入搜索关键词"
            show-action="true"
            left-icon="search"
            shape="round"
            @search="onSearch"
            background="#ED5B00"

          >
            <div v-if="unm"  slot="action" @click="onLogin"  icon="search">未登录</div>
            <div v-else   slot="action"   icon="search">{{Users}}</div>
            <!--<div v-else icon="search">{{users}}</div>-->
          </van-search>
      </van-sticky>
      <div style="">
        <!--轮播图-->
        <van-swipe :autoplay="3000" id="lbt" >
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image"  style="width: 80%; height: 10%"/>
          </van-swipe-item>
        </van-swipe>

        <!--九宫格    正方形格子-->
        <van-grid :gutter="10">
          <van-grid-item
            v-for="value in icons"
            :key="value"
            :icon="value.image"
            :text="value.text"
          />
        </van-grid>
      </div>
      <!--秒杀活动-->
<!--推荐商品-->
      <!--布局-->
      <van-row>
        <van-col span="12">
          <!--推荐商品1-->
          <van-panel >
            <!--推荐商品的图片-->
            <van-image
              width="100"
              height="100"
              :src="imge[0]"
              fit="cover"
            />
            <div style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{productList.detail}}</div>
            <div style="display:flex;justify-content:left;color:red;margin-left: 5%;font-weight:900;">
              {{productList.price}}￥</div>
          </van-panel>
        </van-col>

        <van-col span="12">
          <!--推荐商品2-->
          <van-panel >
            <!--推荐商品的图片-->
            <van-image
              width="100"
              height="100"
              fit="cover"
              :src="imge[0]"
            />
            <div>内容</div>
          </van-panel>
        </van-col>
      </van-row>
      <!--{{productList}}-->
      <br>
       <div id="ZH">
           真的木有了！
       </div>
      <br>



    </div>
</template>

<script>
  import axios from 'axios';
  import store from '@/store';

  export default {
    name: 'Home',
    store,
    data() {
      return {
        users: store.state.users,
        value: '',
        unm:'',
        //用户的信息
        Users:'未登录',
        //推荐商品的图片
        imge:[
          require('../assets/logo.png'),
        ],
        //轮播图片
        images: [
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg'
        ],
        //功能栏图片
        icons:[
          { text:'生鲜',image:'https://img.yzcdn.cn/vant/cat.jpeg' },
          { text:'生鲜',image:'https://img.yzcdn.cn/vant/cat.jpeg' },
          { text:'生鲜',image:'https://img.yzcdn.cn/vant/cat.jpeg' },
          { text:'生鲜',image:'https://img.yzcdn.cn/vant/cat.jpeg' },
          { text:'生鲜',image:'https://img.yzcdn.cn/vant/cat.jpeg' },
          { text:'生鲜',image:'https://img.yzcdn.cn/vant/cat.jpeg' },
          { text:'生鲜',image:'https://img.yzcdn.cn/vant/cat.jpeg' },
          { text:'生鲜',image:'https://img.yzcdn.cn/vant/cat.jpeg' },
        ],
        productList:'',
      }
    },
    methods: {
      //点击进入登录页面
      onLogin(){
        this.$router.push({
          path:'/login',
        })
      },
      //判断登录状态
      getUserState(){
        if (store.state.users !== null){
          this.unm=false
          this.Users = store.state.users.username
        }
      },
      getPrducts(){
        //获取当前对象
        var this_=this;
        var params = new URLSearchParams();
        params.append('productId',10000)

        axios.post('/portal/product/detail.do',params)
          .then(function (datas) {
            //获取状态码
            var status = datas.data.status;
            if (status !== 200){
                //弹出错误信息
              this_.$dialog.alert({
                message:datas.data.msg
              });
            }else {
              this_.productList = datas.data.data
            }
          })
      },
      onSearch() {
        this.$router.push({
          //跳转的路径
          path:'/',
          //携带的数据
          query:{da:this.datauser}
        })
      },
      created: function () {
        this.$emit('public_header', false);
      },
    },
    //在页面加载的时候就执行
    activated:function () {
      this.getPrducts();
      this.getUserState();
    }
  };
</script>

<style scoped>
  #app1{
    margin-bottom: 10%;
    /*background-color: black;*/
  }
#ssk{
 z-index: 2;
}
  #lbt{
    /*width: 100%;*/
    /*height: 20% ;*/
    margin-top: 0%;

  }
  #lbt img{
    width: 100%;
    height: 100%;
    margin-top: 0%;
  }
  #ZH{
    display: flex;
    width: 100%;
    height: 20%;
    justify-content: center;
  }

</style>
