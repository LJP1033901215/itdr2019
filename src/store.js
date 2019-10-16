import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
//储存状态管理
export default new Vuex.Store({
  state: {
    //用户信息
    users:'',
    //用户的密保问题
    question:'',
    //返回的令牌
    token:'',
    //底部导航栏的状态
    navigation:true,
  },
  mutations: {

  },
  actions: {

  },
});
