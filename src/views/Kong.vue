<template>

</template>

<script>
  export default {
    name: 'kong',
    data(){
    },
    methods:{
      tz(){
        this.$router.replace({
          path:'/cart'
        })
      },
    },
    activated:function () {
      this.tz();
    },
  };
</script>

<style scoped>

</style>
