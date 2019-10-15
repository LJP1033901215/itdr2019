<template>
    <div>
      <!--注册页面=========================================================================================-->
      <!--标题栏-->
      <van-nav-bar
        title="用户注册"
        left-text="登录"
        right-text=""
        left-arrow
        @click-left="onClickLeft"

        id="van-nav-bar"
      />
      <div id="h1">
        <h3>注册信息</h3>
      </div>
      <!--注册表单-->
      <van-cell-group>
        <!--用户名-->
        <van-field
          v-model="username"
          required
          :clearable="nnm"
          label="用户名"
          right-icon="question-o"
          placeholder="请输入用户名"
          @click-right-icon="$toast('请输入用户名')"
          class="van-field"
          @blur="YZMM"

          focus

        />
        <!--密码-->
        <van-field
          v-model="password"
          required
          :clearable="nnm"
          type="password"
          label="密码"
          right-icon="question-o"
          placeholder="请输入密码"
          @click-right-icon="$toast('请输入密码')"
          class="van-field"
        />
        <van-field
          v-model="password2"
          required
          :clearable="nnm"
          type="password"
          label="确认密码"
          right-icon="question-o"
          placeholder="请您再次输入密码"
          @click-right-icon="$toast('请再次输入密码')"
          class="van-field"
          @blur="QDMM"
        />
        <!--getEmail-->
        <van-field
          v-model="email"
          :required="uum"
          :clearable="nnm"
          label="email"
          right-icon="question-o"
          placeholder="请输入您的Email"
          @click-right-icon="$toast('请输入Email')"
          class="van-field"
          @blur="YZYX"
        />
        <!--getPhone电话-->
        <van-field
          v-model="phone"
          :required="uum"
          :clearable="nnm"
          label="电话"
          right-icon="question-o"
          placeholder="请输入您的电话"
          @click-right-icon="$toast('请输入电话')"
          class="van-field"
        />
        <!--getQuestion密保问题-->
        <van-field
          v-model="question"
          required
          :clearable="nnm"
          label="密保问题"
          right-icon="question-o"
          placeholder="请设置您的密保问题"
          @click-right-icon="$toast('请认真填写密保问题')"
          class="van-field"
        />
        <!--密保答案getAnswer-->
        <van-field
          v-model="answer"
          required
          :clearable="nnm"
          label="答案"
          right-icon="question-o"
          placeholder="请输入答案"
          @click-right-icon="$toast('请认真填写答案')"
          class="van-field"
        />


      </van-cell-group>
      <!--注册按钮-->
      <van-button type="primary"
                  size="large"
                  color="#FF6700"
                  :round="nnm"
                  id="an"
                  @click="zc"

      >创建账户</van-button>
    </div>
</template>


<script>
  import axios from 'axios';

  export default {
    name: 'register',
    data(){
      return{
        nnm:true,
        uum:false,
        num:true,
        username:'',
        password:'',
        password2:'',
        email:'',
        phone:'',
        question:'',
        answer:'',

      }
    },
    methods:{
      //注册的方法
      zc(){
            var this_ = this;
          //定义定义存放值得函数
            var params = new URLSearchParams();
            params.append('username',this.username);
            params.append('password',this.password);
            params.append('email',this.email);
            params.append('phone',this.phone);
            params.append('question',this.question);
            params.append('answer',this.answer);

            axios.post('/portal/user/register.do',params)
              .then(function (datas) {
                if (datas.data.status !== 200){
                  //弹出错误信息
                  this_.$toast(datas.data.msg);
                  // this_.$dialog.alert({
                  //   message:datas.data.msg
                  // });
                }else if(datas.data.status === 200){
                  //弹出提醒
                  this_.$dialog.alert({
                    message: '注册成功',
                  });
                  //跳转回登录页面
                  this_.$router.push({
                    path:'/login'
                  })
                }else {
                  this_.$notify('注册失败,请重新尝试');
                };
              })
      },
      //验证用户的方法
      YZMM(){
        var this_ = this;
        var params = new URLSearchParams();
        params.append('str',this.username);
        params.append('type','username');
        axios.post('/portal/user/check_valid.do',params)
          .then(function (datas) {
              if (datas.data.status !== 200){
                this_.$toast(datas.data.msg);
                this_.username='';
              } ;
          })
      },
      //验证邮箱的方法
      YZYX(){
        var this_ = this;
        var params = new URLSearchParams();
        params.append('str',this.email);
        params.append('type','email');
        axios.post('/portal/user/check_valid.do',params)
          .then(function (datas) {
            if (datas.data.status !== 200){
              this_.$toast(datas.data.msg);
              this_.email='';
            } ;
          })
      },
      //验证密码是否相同的验证
      QDMM(){
        if (this.password !== this.password2){
          this.$toast('两次输入的密码不相同，请重新输入');
          // this.$notify('两次输入的密码不相同，请重新输入');
          this.password2='';
        } ;
      },
      // //验证是否都填写完成
      // YY(){
      //   if (this.password !== null || this.password.equals('')) {
      //     this.num = false ;
      //   };
      // },
      //导航栏点击方法
      onClickLeft() {
        this.$router.push({
          path:'/login'
        })
      },

    }
  };
</script>

<style scoped>
  .van-field{
    margin-top: 5px;
  }
  #h1{
    display: flex;
    justify-content:  center;
  }
  #an{
    margin-top: 30px;
    width: 90%;
  }
</style>
