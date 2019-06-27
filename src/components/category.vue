<template>
    <div class="container">
      <app-header></app-header>
      {{cate}}
      <app-footer></app-footer>
    </div>
</template>

<script>
  import Header from "../components/Header"
  import Footer from "../components/Footer"

    export default {
        name: "category",
      components:{
        "app-header":Header,
        "app-footer":Footer
      },
      data(){
          return {
            cate:this.$route.params.cate,
          }
      },
      watch: {
        '$route' (to, from) {
          this.$router.go(0);

        }}
    }
</script>

<style scoped>

</style>
