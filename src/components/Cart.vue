<template>
  <div>
    <!--头部导航栏-->
    <top-back :content="title"></top-back>
    <!--商品-->
    <van-checkbox-group class="card-goods" v-model="result" ref="checkboxGroup">
      <van-checkbox
        class="card-goods__item"
        v-for="item in goods"
        :key="item.id"
        :name="item.productId"
        checked-color="#07c160"
        @click="checkOne(item.productId,item.productChecked)"
      >
        <!--删除-->
        <van-swipe-cell>
          <van-cell :border="false" value="内容" id="van-cell">
            <van-card
              :title="item.name"
              :price="item.price"
              :thumb="item.mainImage"
              :num="item.quantity"
            />
          </van-cell>

          <template slot="right">
            <van-button square
                        type="danger"
                        text="删除"
                        id="dl"
                        @click="del(item.productId)"/>
          </template>
        </van-swipe-cell>

        <!--加减商品-->
        <van-stepper v-model="item.quantity"
                     @plus="plus(item.productId,item.quantity)"
                     @minus="minus(item.productId,item.quantity)"/>
      </van-checkbox>
    </van-checkbox-group>

    <!--结算-->
    <van-submit-bar
      id="bt"
      :price="price*100"
      :disabled="!result.length"
      :button-text="submitBarText"
      @submit="onSubmit"
    >
      <div id="allchecked">
        <van-checkbox
          v-model="checked"
          @click="checkAll"
          checked-color="#07c160"
        />
      </div>

    </van-submit-bar>


    <br/>
    <br/>
    <br/>
  </div>
</template>

<script>
  import TopBack from '@/components/TopBack.vue';
  import axios from 'axios';
  import store from '@/store';

  export default {
    name: 'Cart',
    components: { TopBack },
    data() {
      return {
        //购物车商品id
        result: [],
        //购物车列表
        goods: '',
        title: '购物车',
        checked: false,
        user: store.state.users,
        price: ''
      };
    },
    computed: {
      submitBarText() {
        const count = this.result.length;
        return `结算${count ? `(${count})` : ''}`;
      },

    },
    //刷新

    methods: {
      //删除商品
      del(productId) {
        //保存当前对象
        const this_ = this;
        //封装前端传向后端的数据
        const params = new URLSearchParams();
        params.append('productIds', productId);
        axios.post('/portal/cart/delete_product.do', params)
          .then(function (datas) {
            // 获取状态码
            const { status } = datas.data;
            if (status !== 0) {
              this_.$dialog.alert({
                message: datas.data.msg
              });
            }
          });
      },
      //增加
      plus(productId, quantity) {
        //保存当前对象
        const this_ = this;
        //封装前端传向后端的数据
        const params = new URLSearchParams();
        params.append('productId', productId);
        params.append('count', quantity + 1);

        axios.post('/portal/cart/update.do', params)
          .then(function (datas) {
            // 获取状态码
            const { status } = datas.data;
            if (status !== 0) {
              this_.$dialog.alert({
                message: datas.data.msg
              });
            }
          });
      },
      //减少
      minus(productId, quantity) {
        //保存当前对象
        const this_ = this;
        //封装前端传向后端的数据
        const params = new URLSearchParams();
        params.append('productId', productId);
        params.append('count', quantity - 1);

        axios.post('/portal/cart/update.do', params)
          .then(function (datas) {
            // 获取状态码
            const { status } = datas.data;
            if (status !== 0) {
              this_.$dialog.alert({
                message: datas.data.msg
              });
            }
          });
      },
      //选中商品or取消选中
      checkOne(productId, check) {
        //保存当前对象
        var this_ = this;
        // console.log(productId, check);
        //封装传向后端的数据
        const params = new URLSearchParams();

        if (check === 0) {
          params.append('productId', productId);
          params.append('check', 1);
          axios.post('/portal/cart/select.do', params)
            .then(function (datas) {
              // console.log(datas);
              this_.check = 1;
              //存放价格的
              this_.price = datas.data.data.cartTotalPrice;
            });
          axios.post('/portal/cart/list.do')
            .then(function (datas) {
              //获取状态码
              var status = datas.data.status;
              if (status === 0) {
                this_.goods = datas.data.data.cartProductVoList;
              }
            });
        } else {
          params.append('productId', productId);
          params.append('check', 0);
          axios.post('/portal/cart/un_select.do', params)
            .then(function (datas) {
              // console.log(datas);
              this_.check = 0;
              this_.price = 0.00;
            });
          axios.post('/portal/cart/list.do')
            .then(function (datas) {
              //获取状态码
              var status = datas.data.status;
              if (status === 0) {
                this_.goods = datas.data.data.cartProductVoList;
              }
            });
        }
      },
      //全选or取消全选
      checkAll() {
        //保存当前对象
        const this_ = this;
        if (this_.checked === false) {
          // console.log(this_.checked);
          // 封装前端传递给后端的数据
          const params = new URLSearchParams();
          params.append('check', 1);

          axios.post('/portal/cart/select_all.do', params)
            .then(function (datas) {
              // console.log(datas);
              this_.price = datas.data.data.cartTotalPrice;
              //获取状态码
              var status = datas.data.status;
              if (status !== 0) {
                //弹出错误信息
                this_.$dialog.alert({
                  message: datas.data.msg()
                });
              }
            });

          this.$refs.checkboxGroup.toggleAll(1);
          this.checked = 1;

        } else {
          // 封装前端传递给后端的数据
          const params = new URLSearchParams();
          params.append('check', 0);

          axios.post('/portal/cart/un_select_all.do', params)
            .then(function (datas) {
              // console.log(datas);
              this_.price = 0.00;
              //获取状态码
              var status = datas.data.status;
              if (status !== 0) {
                //弹出错误信息
                this_.$dialog.alert({
                  message: datas.data.msg()
                });
              }
            });
          this.$refs.checkboxGroup.toggleAll();
          this.checked = 0;
        }

      },
      formatPrice(price) {
        return (price / 100).toFixed(2);
      },
      onSubmit() {
        Toast('点击结算');
      },

      //获取商品列表
      getProductList() {
        // 保存当前对象
        const this_ = this;
        axios.post('/portal/cart/list.do')
          .then(function (datas) {
            // console.log(datas);
            //获取状态码
            var status = datas.data.status;
            if (status !== 0) {
              //弹出错误信息
              this_.$dialog.alert({
                message: datas.data.msg
              });
              this_.$router.push({
                path: '/login',
              });
            } else {
              //赋值
              this_.goods = datas.data.data.cartProductVoList;
              //遍历
              for (var i = 0; i < this_.goods.length; i++) {
                if (this_.goods[i].productChecked === 1) {
                  this_.result.push(this_.goods[i].productId);
                }
              }
            }
          });

      }
    },
    activated() {
      this.getProductList();
    }

  };
</script>

<style lang="less">
  #fxk {
    background-color: #fafafa;
  }

  #van-cell {
    padding: 0 !important;
  }

  #allchecked {
    /*width: 150px !important;*/
    float: left !important;
    margin-left: 10px;
  }

  /*.f {*/
  /*padding-left: 10px !important;*/
  /*padding-top: 43px !important;*/
  /*padding-bottom: 43px !important;*/
  /*background-color: #fafafa;*/
  /*}*/

  #dl {
    height: 100% !important;
  }

  #bt {
    bottom: 50px !important;
  }

  .van-card:not(:first-child) {
    margin-top: 0 !important;
  }

  .card-goods {
    background-color: #fff;
    /*padding: 15px 10px;*/
    &__item {
      position: relative;
      background-color: #fafafa;
      .van-checkbox__label {
        width: 100%;
        height: auto; // temp
        padding: 0 10px 0 15px;
        box-sizing: border-box;
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
