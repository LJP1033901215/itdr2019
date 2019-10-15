<template>
    <div >
      <!--轮播图-->
      <van-swipe :autoplay="3000" style="height: 90%">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image"  class="dd"/>
        </van-swipe-item>
      </van-swipe>
      <!--商品卡片的加载-->
      <!--<van-card-->
        <!--price="2.00"-->
        <!--:desc="desc"-->
        <!--title="商品标题"-->
      <!--/>-->
      <!--商品详情-->
      <van-cell-group>
        <van-cell>
          <div class="goods-title">{{ goods.title }}</div>
          <div class="goods-price">{{ formatPrice(goods.price) }}</div>
        </van-cell>
        <van-cell class="goods-express">
          <van-col span="10">运费：{{ goods.express }}</van-col>
          <van-col span="14">剩余：{{ goods.remain }}</van-col>
        </van-cell>
      </van-cell-group>
      <!--购物车-->
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" text="购物车" :info= "num" />
        <van-goods-action-icon icon="shop-o" text="店铺" info="12" />
        <van-goods-action-button type="warning" text="加入购物车" @click="add"/>
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </div>
</template>

<script>

  export default {
    //姓名
    name: 'info',
    //属性
    data(){
      return{
        num: 0,
        desc:"电脑",
        images: [
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg',
          require('../assets/logo.png')
        ],
        goods: {
          title: 'Iphone6s',
          price: 600000,
          express: '免运费',
          remain: 999,
        }

      }
    },
    //方法
    methods:{
      add(){
        this.num++
      },
      formatPrice() {
        return '¥' + (this.goods.price / 100).toFixed(2);
      },
    }
  };
</script>

<!--/*scoped指得是只在当前组件有效*/-->
<style scoped>
.dd{
  width: 85%;
  height: 80%;
}

.goods-title {
   font-size: 16px;
 }
.goods-price {
   color: #f44;
 }
.goods-express {
   color: #999;
   font-size: 12px;
   padding: 7px 15px;
 }
</style>
