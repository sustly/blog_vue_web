<template>
  <div class="container">
    <app-header></app-header>
    <h3 style="text-align: center">说明</h3>
    <p style="padding-left: 20px">目前只有增删改查，全文检索功能，后续会增加其他功能。</p>
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
