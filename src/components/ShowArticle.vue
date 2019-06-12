<template>
  <div class="container">
    <app-header></app-header>
    <h1>{{id}}</h1>
    <app-footer></app-footer>
    </div>
</template>

<script>

  import Header from "../components/Header"
  import Footer from "../components/Footer"
  export default {
        name: "ShowArticle",
    data(){
          return {
            id:this.$route.params.id
          }
    },
      components:{
        "app-header":Header,
        "app-footer":Footer
      }
    }
</script>

<style scoped>

</style>
