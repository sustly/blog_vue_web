<template>
  <div class="container">
    <app-header></app-header>
    <show-article-list></show-article-list>
    <app-footer></app-footer>
  </div>
    
</template>

<script>
  import Header from "../components/Header"
  import Footer from "../components/Footer"
  import ShowArticleList from "./ShowArticleList"
    export default {
        name: "Hot",
      components:{
        "app-header":Header,
        "app-footer":Footer,
        "showArticleList":ShowArticleList
      },
      created(){
          this.$store.commit("setType", 'hot');
        this.$store.commit("setSearch","");
      },
      destroyed(){
        this.$store.commit("setType", '')
      }
    }
</script>

<style scoped>

</style>
