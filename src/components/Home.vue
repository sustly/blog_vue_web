<template>
    <div class="container">
      <app-header></app-header>
        <router-view></router-view>
      <show-article-list></show-article-list>
      <app-footer></app-footer>
    </div>
</template>


<script>
  import Footer from "../components/Footer"
  import Header from "../components/Header"
  import ShowArticleList from "./ShowArticleList"
    export default {
        name: "Home",
      components:{
        "app-header":Header,
        "app-footer":Footer,
        "showArticleList":ShowArticleList
      },
      created(){
          this.$store.commit("setType", 'home')
      }
    }
</script>

<style scoped>

</style>
