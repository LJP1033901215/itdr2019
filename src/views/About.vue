<template>
  <div class="about">
    {{num}}}
    <ul>
      <li v-for="(user,index) in datauser" :key="index">
        {{user}}
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name:'about',
    props:['datauser'],
    data(){
      return{
        num:0
      }
    },
    methods:{

    }
  };
</script>
<style scoped>

</style>
