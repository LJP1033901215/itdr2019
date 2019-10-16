<template>
    <!--分类页面========================================================================================================-->
  <div>
    <!--侧边导航-->
    <van-sidebar v-model="activeKey">
      <van-sidebar-item title="标签名称" />
      <van-sidebar-item title="标签名称" />
      <van-sidebar-item title="标签名称" />
    </van-sidebar>
  </div>
</template>

<script>
  export default {
    name: 'Classify',
    data() {
      return {
        activeKey: 0
      };
    },
    methods:{
      onList
    }
  };
</script>

<style scoped>

</style>
