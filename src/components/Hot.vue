<template>
  <div class="container">
    <app-header></app-header>

    <app-footer></app-footer>
  </div>
    
</template>

<script>
  import Header from "../components/Header"
  import Footer from "../components/Footer"
    export default {
        name: "Hot",
      components:{
        "app-header":Header,
        "app-footer":Footer
      }
    }
</script>

<style scoped>

</style>
