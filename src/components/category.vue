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
        name: "category",
      components:{
        "app-header":Header,
        "app-footer":Footer,
        "showArticleList":ShowArticleList
      },
      created(){
        this.$store.commit("setType", this.$route.params.cate);
        this.$store.commit("setSearch","");
      },
      destroyed(){
        this.$store.commit("setType", '')
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
