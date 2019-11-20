<template>
<!--购物车页面===========================================================================================================-->
  <div>
    <!--返回栏-->
    <!--<van-nav-bar-->
      <!--title="购物车"-->
      <!--left-text="返回首页"-->
      <!--right-text=""-->
      <!--left-arrow-->
      <!--@click-left="onClickLeft"-->
      <!--id="van-nav-bar"-->
    <!--/>-->




    <!--购物车主页-->
      <van-checkbox-group class="card-goods" v-model="checkedGoods" id="app" v-if="getdata.length!==0">
        <van-checkbox
        class="card-goods__item"
        v-for="item in getdata"
        :key="item.an.id"
        :name="item.an.productId"
        @click="choice(item.an.productId,item.an.productChecked)">
          <!--中间是滑动按钮2.===================================================================-->
          <van-swipe-cell  id="hdzz">
            <!--中间是数据1.=========================================================-->
            <van-card
              :title="item.an.name"
              :desc="item.an.subtitle"
              :num="item.an.quantity"
              :price="formatPrice(item.an.price)"
              :thumb="item.an.mainImage"
            />
            <!--1.====================================================================-->
            <template slot="right" id="hdzz">
              <van-button square
                          type="danger"
                          text="删除"
                          id="hd"
                          @click="onClose(item.an.productId)"/>
            </template>
          </van-swipe-cell>
          <!--2.================================================================================-->
      </van-checkbox>
    </van-checkbox-group>
    <van-divider v-else>空空如也</van-divider>
    <!--结算-->
    <van-submit-bar
      :price="totalPrice"
      :disabled="!checkedGoods.length"
      :button-text="submitBarText"
      @submit="onSubmit"
      id="jiesuan"
    />
  </div>
</template>


<script>
  // import TopBack from '@/components/TopBack.vue';
  import axios from 'axios';
  import store from '@/store';

  export default {

    name: 'Cart',
    components: { TopBack },
    data() {
      return {
        //所有的数组的编号
        AllcheckdGoods:[],
        //选中的数组
        checkedGoods: [],
        //存放的商品数据
        getdata:[],
        //未选中的数组
        NOcherkedGoods: []
      };
    },
    // watch:{
    //   pen:{
    //     checkedGoods: this.choice
    //   }
    // },
    computed: {
      submitBarText() {
        const count = this.checkedGoods.length;
        return '结算' + (count ? `(${count})` : '');
      },
      totalPrice() {
        // return this.goods.reduce((total, item) => total + (this.checkedGoods.indexOf(item.an.id) !== -1 ? item.an.price : 0), 0);
      },

    },
    methods: {
      choice(id,checked){
        //判断状态，如如果为选中状态就调用取消选中的方法
        var this_ = this ;
        var Url ;
        if (checked === 1){
          Url = '/portal/cart/un_select.do';
        }else {
          Url = '/portal/cart/select.do';
        }
        const params = new URLSearchParams();
        params.append('listPid',id)
        axios.post( Url , params)
          .then(function (datas) {
            if (datas.data.status !== 200){
              this_.$toast('操作失败');
            }else{
              if (checked === 1){
                this_.checked = 0 ;
                axios.post('/portal/cart/list.do')
                  .then(function (datas) {
                    if (datas.data.status===200){
                      console.log(this_.checkedGoods)
                    }
                  })
              }else{
                this_.checked = 1;
                this_.getCartList()
              }

            }
          })
      },
      //获取购物车数据
      getCartList(){
        var this_ = this;
        this.getdata.splice(0)
        this.AllcheckdGoods.splice(0)
        this.checkedGoods.splice(0)
        axios.post('/portal/cart/list.do')
          .then(function (datas) {
            if (datas.data.status!==200){
              this_.$toast('未登录');
            } else {
              //将数据放到数组中，方便后面进行遍历
              // console.log(datas.data.data.cartProductVOS[1])
              //对数据进行循环，遍历出里面的所有
              for(var i = 0 ;i<datas.data.data.cartProductVOS.length;i++){
                //将数据一个一个放到数据中
                this_.getdata.push({an:datas.data.data.cartProductVOS[i]})
                 //所有的数组放到数组中
                this_.AllcheckdGoods.push(datas.data.data.cartProductVOS[i].productId)
                //判断是否选中,选中的放到数组中
                if(datas.data.data.cartProductVOS[i].productChecked === 1){
                  this_.checkedGoods.push(datas.data.data.cartProductVOS[i].productId);
                }
                //将数据输出出来看看是否存入到数组中
                // console.log(datas.data.data.cartProductVOS[i])
              };
              console.log(this_.getdata);
            }
        })
      },
      //删除购物车
      onClose(data){
        var this_ = this ;
        var params = new URLSearchParams();
        params.append('productIds',data);
        axios.post('/portal/cart/delete_product.do',params)
          .then(function (datas) {
            if (datas.data.status!==200){
              this_.$dialog.alert({
                message:'删除失败'
              })
            }else{
              // this_.reload
              this_.$router.replace({
               path:'/kong'
              })
            }
          })
      },
      //返回数据
      onClickLeft(){
        this.$router.push({
            path:'/',
          }
        )
      },
      formatPrice(price) {
        return (price).toFixed(2);
      },
      onSubmit() {
        Toast('点击结算');
      }
    },
    activated:function () {
     this.getCartList();
    },
  };
</script>

<style lang="less" scoped>
  #hdzz{
    border: 0px saddlebrown solid!important;
  }
  #hd{
    height: 100%!important;
  }
  #app{
  text-align:left !important;
    margin: 0px!important;
    /*padding: 30px!important;*/
}
  #jiesuan{
    bottom: 50px;
  }
  .card-goods {
    padding: 15px 10px 100px 10px!important;
    /*background-color: #fff;*/
    &__item {
      position: relative;
      background-color: #fafafa;
      .van-checkbox__label {
        width: 100%;
        height: auto; // temp
        /*padding: 0 10px 0 15px;*/
        box-sizing: border-box;
        .van-card__content{
          .van-card__desc{
            width: 200px;
          }
        }
      }
      .van-checkbox__icon {
        top: 50%;
        left: 10px;
        z-index: 1;
        position: absolute;
        margin-top: -10px;
      }
      .van-card__price {
        color: #f44;
      }
    }

  }
</style>
