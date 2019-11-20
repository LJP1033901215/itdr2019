<template >
    <div id="app1">
      <!--吸顶操作-->
      <van-sticky :offset-top="0">

          <!--搜索框-->
        <van-search
          background="#ED5B00"
          id="ssk"
          left-icon="search"
          v-model="value"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
          @search="onSearch"
        >
          <div v-if="bl" slot="action" @click="goMyCentr" style="color: aliceblue"> {{name}} </div>
          <div v-else  slot="action" @click="onLogin" style="color: aliceblue">未登录</div>
        </van-search>
      </van-sticky>
        <!--轮播图-->
        <van-swipe :autoplay="3000" id="lbt" >
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image"  style="width: 80%; height: 10%"/>
          </van-swipe-item>
        </van-swipe>
        <!--九宫格    正方形格子-->
        <van-grid :gutter="6"  :border="nnm" >
          <van-grid-item
            class = "DH"
            style="font-size:40px !important;"
            v-for="name1 in icons"
            :key="name1.text"
            :text="name1.text"
            :icon="name1.img"

          />
        </van-grid>
      <!--秒杀活动线段-->
      <van-divider :style="{ color: '#262626', borderColor: '#F5F5F5', padding: '0 16px' ,margin: '15px !important'}">
       以下是为您推荐
      </van-divider>
          <!--推荐商品-->
      <!--布局大盒子-->
        <van-col span="10" offset="1"  v-for="item in productList" >
          <!--推荐商品1-->
          <van-panel >
            <!--推荐商品的图片-->
            <van-image
              width="135"
              height="135"
              :src="item.SJ.mainImage"
              fit="cover"
              @click="goProduct(item.SJ.id)"
            />
            <div style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.SJ.subtitle}}</div>
            <div style="display:flex;justify-content:left;color:red;margin-left: 5%;font-weight:900;">
              ￥{{item.SJ.price}}</div>
          </van-panel>
        </van-col>
      <br>
       <div id="ZH">
           然后，然后就真的木有了！
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
        users: store.state.users ,
        unm:true,
        nnm:false,
        value:"",
        //用户的信息
        Users:'未登录',
        //存放商品信息数组
        productList:[],
        //推荐商品的图片
        imge:[
          'http://pzkb4ydfd.bkt.clouddn.com/iphone1.jpg',
          'http://pzkb4ydfd.bkt.clouddn.com/P1.jpg',
          'http://pzkb4ydfd.bkt.clouddn.com/L1.jpg'
        ],
        //轮播图片
        images: [
          'https://i.loli.net/2019/11/10/yaDqvx217KmkStd.jpg',
          'https://i.loli.net/2019/11/10/gYc72BOeaQU5nMy.jpg',
          'https://i.loli.net/2019/11/10/JyfeobRY46mvErw.jpg'
        ],
        //功能栏图片
        icons:[
          {text:'超市',img:'https://i.loli.net/2019/11/10/X2v8TsGZyfLu1WH.png'},
          {text:'电器',img: 'https://i.loli.net/2019/11/10/eAtqgZvu5UyhpTC.png'},
          {text:'生鲜',img:  'https://i.loli.net/2019/11/10/PIe7gLKA9iN1d5R.png'},
          {text:'衣服',img: 'https://i.loli.net/2019/11/10/Eek25y4IlQGKRJL.png'},
          {text:'优惠卷',img:'https://i.loli.net/2019/11/10/FQUv2Trw8MpYKXd.png'},
          {text:'赚钱',img:'https://i.loli.net/2019/11/10/4zVv2KdnTMGZHOS.png'},
          {text:'拼购',img: 'https://i.loli.net/2019/11/10/BgsfvKSIykXUwi3.png'},
          {text:'充值',img: 'https://i.loli.net/2019/11/10/z6huHkPej7VlW9q.png'},
          // { text:'生鲜',image:'https://img.yzcdn.cn/vant/cat.jpeg' },
        ],
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
      // getUserState(){
      //   if (store.state.users !== ''){
      //     this.unm = false
      //     this.Users = store.state.users.username
      //   }
      // },
      getPrducts(){
        //清空数组
        this.productList.splice(0);
        //获取当前对象
        var this_=this;
        axios.post('/portal/product/detailNewOrHetOrBanner.do')
          .then(function (datas) {
            // console.log(datas.data.data)
            var a = datas.data.data;
            //获取状态码
            var status = datas.data.status;
            if (status !== 200){
                //弹出错误信息
              this_.$dialog.alert({
                message:"加载错误"
              });
              //存放数组
            }else {
              //将遍历出来的集合放到数组中
              for (var i = 0;i<a.length;i++){
                this_.productList.push({SJ:a[i]})

              }
              console.log(this_.productList)
            }
          })
      },
      //跳转到页面详情
      goProduct(data){
        this.$router.push({
          path:'/productDetail',
          query:{da:data}
        })
      },
      //跳转到我的页面
      goMyCentr(data){
        this.$router.push({
          path:'/myCentr'

        })
      },
      onSearch() {
        this.$router.push({
          //跳转的路径
          path:'/',
        })
      },
      created: function () {
        this.$emit('public_header', false);
      },
    },
    //在页面加载的时候就执行
    activated:function () {
      this.getPrducts();
    },
    computed:{
      //定义方法
      bl(){
        if (store.state.users!==''){
          return true
        }else {
          return false
        }
      },
      name(){
        return store.state.users.username;
      }
    },
  };
</script>

<style scoped>
  .DH{
    width: 100%;
    height: 100%;
  }
  .DH{

    position: static !important;
    border: none !important;

    z-index: 10;
  }

  #app1{
    margin-bottom: 10%;
    /*background-color: black;*/
  }
#ssk{
 z-index: 99;
}
  #lbt{
    /*width: 100%;*/
    /*height: 20% ;*/
    margin-top: 0%;
    height: 170px!important;

  }
  #lbt img{
    width: 100% !important;
    height: 100% !important;


  }
  #ZH{
    display: flex;
    width: 100%;
    height: 20%;
    justify-content: center;
  }

</style>
