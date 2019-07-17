<template>
  <div class="container">
    <app-header></app-header>
    <h3 style="text-align: center">说明</h3>
    <p style="padding-left: 20px">2019.7.16：使用懒加载的方式优化第一次加载页面的时间长度。</p>
    <p style="padding-left: 20px">2019.7.3：目前只有增删改查，全文检索功能，后续会增加其他功能。</p>
    <app-footer></app-footer>
  </div>

</template>

<script>
  import Header from "../components/Header"
  import Footer from "../components/Footer"
  export default {
    name: "aboutMe",
    components:{
      "app-header":Header,
      "app-footer":Footer
    }
  }
</script>

<style scoped>

</style>
