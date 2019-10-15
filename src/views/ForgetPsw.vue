<template>
    <div >
      <!--忘记密码=========================================================================================-->
      <!--查询设置用户是否存在-->
      <div v-if="num1">
        <!--标题栏-->
        <van-nav-bar
          title="验证用户"
          left-text="返回"
          right-text=""
          left-arrow
          @click-left="onClickLeft"
          id="van-nav-bar"
        />
        <!--输入框-->
        <h3>用户名</h3>
        <van-cell-group>
          <van-field v-model="username" placeholder="请输入用户名" />
        </van-cell-group>
        <!--按钮-->
        <van-button type="primary" size="large" id="an" @click="TJ">提交</van-button>
      </div>

      <!--回答密保问题-->
      <div  v-if="num2" >
        <!--标题栏-->
        <van-nav-bar
          title="验证问题"
          left-text="返回"
          right-text=""
          left-arrow
          @click-left="onClickLeft2"
          id="van-nav-bar"
        />
        <!--输入框-->
        <h3>密保问题</h3>
        <van-cell :value= "question" />
        <van-cell-group>
          <van-field v-model="answer" placeholder="请输入答案" />
        </van-cell-group>
        <!--按钮-->
        <van-button type="primary" size="large" id="an" @click="TJ2">提交</van-button>
      </div>

      <!--重置密码带用户名-->
      <div  v-if="num3"><!--标题栏-->
        <van-nav-bar
          title="重置密码"
          left-text="返回"
          right-text=""
          left-arrow
          @click-left="onClickLeft3"
          id="van-nav-bar"
        />
        <!--输入框-->
        <h3>重置密码</h3>
        <van-cell-group>
        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          :clearable="nnm"
          :required="nnm"
          right-icon="question-o"
          @click-right-icon="$toast('请输入密码')"
          class="van-field"
        />
          <van-field
            v-model="password2"
            type="password"
            label="确认密码"
            placeholder="请再次输入密码"
            :clearable="nnm"
            :required="nnm"
            right-icon="question-o"
            @click-right-icon="$toast('请保证和上面的密码相同')"
            class="van-field"
            @blur="YZ"
          />
        </van-cell-group>
        <!--按钮-->
        <van-button v-if="mmm" disabled type="primary" size="large" id="an" @click="TJ3">提交</van-button>
        <van-button v-else   type="primary" size="large" id="an" @click="TJ3">提交</van-button>
      </div>

    </div>


</template>

<script>
  import axios from 'axios';
  import store from '@/store';

  export default {
    name: 'forgetPsw',

    store,

    data(){
      return{
        username:'',
        num1:true,
        num2:false,
        num3:false,
        question:'',
        answer:'',
        nnm:true,
        uum:false,
        password2:'',
        password:'',
        mmm:true
      }
    },
    methods:{
      TJ(){
        store.state.navigation = false;
        var this_ = this;
        //定义定义存放值得函数
        var params = new URLSearchParams();
        params.append('username',this.username)
        store.state.users = this.username;
        axios.post('/portal/user/forget_get_question.do',params)
          .then(function (datas) {
            if (datas.data.status !== 200){
              //提示窗口
              this_.$toast(datas.data.msg);
            }else {
              //密保问题放入全局变量中
              store.state.question = datas.data.msg;
              this_.question=datas.data.msg;
              console.log(store.state.question);
              this_.num1 = false ;
              this_.num2 = true ;
            }
          })
        //返回用户的详细情况
      },
      TJ2(){
        var this_ = this;
        //定义定义存放值得函数
        var params = new URLSearchParams();
        params.append('username',store.state.users)
        params.append('question',this.question)
        params.append('answer',this.answer)
        axios.post('/portal/user/forget_check_answer.do',params)
          .then(function (datas) {
            if (datas.data.status !== 200){
              //提示窗口
              this_.$toast(datas.data.msg);
            }else {
              //密保问题放入全局变量中
              store.state.token = datas.data.msg;
              console.log(store.state.token);
              this_.num2 = false ;
              this_.num3 = true ;
            }
          })
      },
      TJ3(){
        var this_ = this;
        //定义定义存放值得函数
        var params = new URLSearchParams();
        params.append('username',store.state.users)
        params.append('passwordNew',this.password)
        params.append('forgetToken',store.state.token)
        axios.post('/portal/user/forget_reset_password.do',params)
          .then(function (datas) {
            if (datas.data.status !== 200) {
              //提示窗口
              this_.$toast(datas.data.msg);
            } else {
              this_.$toast(datas.data.msg)
              this_.$router.push({
                path:'/login'
              })
            }
          })
      },
      //导航栏左侧按钮
      onClickLeft(){
        this.$router.push({
          path:'/login'
        })
      },
      onClickLeft2() {
        this.num2 = false;
        this.num1 = true;
      },
      onClickLeft3() {
        this.num3 = false;
        this.num2 = true;
      },
      //判断两次输入的密码是否相同
      YZ(){
        if (this.password !== this.password2){
          this.$toast('两次输入的密码不相同，请重新输入')
          this.password2 = '';
        } else {
          this.mmm = false;
        };
      }
    }
  };

</script>

<style scoped>
  #van-nav-bar{
    height: 16%;

  }
  #an{
    margin-top: 30px;
    width: 90%;
  }
  .van-field{
    margin-top: 5px;
  }
</style>
