<template>
  <div class="goods">
    <top-back :content="titie"></top-back>
    <!--商品轮播图-->
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in goods.subImages" :key="thumb">
        <img :src="thumb" >
      </van-swipe-item>
    </van-swipe>
    <!--商品基本情况-->
    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goods.subtitle }}</div>
        <div class="goods-price">￥{{goods.price}}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="10">运费：免运费</van-col>
        <van-col span="14">剩余：{{goods.status}}</van-col>
      </van-cell>
    </van-cell-group>
<!--加入购物车-->
    <van-goods-action id ="vfn">
      <van-goods-action-icon icon="chat-o" @click="sorry">
        客服
      </van-goods-action-icon>
      <van-goods-action-icon icon="cart-o" @click="onClick" :info="quantity">
        购物车
      </van-goods-action-icon>
      <van-goods-action-button type="warning" @click="onClickCart">
        加入购物车
      </van-goods-action-button>
      <van-goods-action-button type="danger" @click="onClickBuy">
        立即购买
      </van-goods-action-button>
    </van-goods-action>
    <!--商品详情的分割线-->
    <van-divider :style="{ color: '#C7C7C7', borderColor: '#C7C7C7', padding: '0 16px' , margin:'30px'}">
      商品详情
    </van-divider>
    <!--商品详情的图片-->
    <img v-for="img in goods.subImages" v-lazy="img" style="width: 100% ; height: 100%  ">
  </div>
</template>

<script>
  import axios from 'axios';
  import TopBack from '@/components/ToBack.vue';

  export default {
    name: 'ProductDetail',
    components:{
      TopBack
    },
    data(){
      return{
        goods:'',
        titie:'商品详情',
        // imageList: [
        //   'https://img.yzcdn.cn/vant/apple-1.jpg',
        //   'https://img.yzcdn.cn/vant/apple-2.jpg'
        // ]
        quantity:'',
      }
    },

    methods: {
      //页面一加载就显示
      //获取商品详情
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
              this_.goods = datas.data.data
            }
          })
      },
      //返回购物车数量的方法
      getQuantity(){
        var this_=this;
        axios.post('/portal/cart/get_cart_product_count.do')
          .then(function (datas) {
            var status = datas.data.status;
            if (status!==200){
              this_.quantity = 0;
            }else {
              console.log(datas.data.data)
              this_.quantity = datas.data.data;
            }
          })
      },
      //加入购物车
      onClickCart() {
        // this.$router.push('cart');
      },
      //跳转到购物车
      onClick(){

      },
      //点击立即购买 加入购物车，并切跳转
      onClickBuy(){

      },
      sorry() {
        this.$toast.success('加入成功');
      }
    },
    //在页面加载的时候就执行
    activated:function () {
      this.getPrducts();
      this.getQuantity();
    }
  };
</script>

<style lang="less">
  .goods {
    margin-bottom: 100px;
  &-swipe {
  img {
    width: 100%;
    display: block;
  }
  }
  &-title {
     font-size: 16px;
   }
  &-price {
     color: #f44;
   }
  &-express {
     color: #999;
     font-size: 12px;
     padding: 5px 15px;
   }
  &-cell-group {
     margin: 15px 0;
  .van-cell__value {
    color: #999;
  }
  }
  &-tag {
     margin-left: 5px;
   }
  }
  #vfn{
    bottom: 50px;
  }
</style>





