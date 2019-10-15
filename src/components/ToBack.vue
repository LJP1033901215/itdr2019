<template>
  <div>
    <van-nav-bar
      :title="content"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="onClickLeft"
      id="van-nav-bar"
    />
  </div>
</template>

<script>
  export default {
    name: 'ToBack',
    props:['content'],
    data(){
      return{

      }
    },
    methods:{
      onClickLeft(){
        this.$router.go(-1);
      }
    }
  };
</script>

<style scoped>
  #van-nav-bar{
    height: 16%;
    color: black;
  }
</style>
