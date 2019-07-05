<template>
    <div class="container" v-bind:key="Math.random()">
      <app-header></app-header>
      <show-article-list></show-article-list>
      <app-footer></app-footer>
    </div>
</template>

<script>
  import Footer from "../components/Footer"
  import Header from "../components/Header"
  import ShowArticleList from "./ShowArticleList"
    export default {
        name: "Search",
      data(){
          return {
            search:this.$route.params.search
          }
      },
      components:{
        "app-header":Header,
        "app-footer":Footer,
        "showArticleList":ShowArticleList
      },
      watch: {
        search (to, from) {
          this.$router.go(0);

        }
        },

      created(){
        // 创建Form
        var form = $('<form></form>');
        $(document.body).append(form);
        // 设置属性
        form.attr('action', '/report/make');
        form.attr('method', 'post');
        // form的target属性决定form在哪个页面提交
        // _self -> 当前页面 _blank -> 新页面
        form.attr('target', '_blank');

        this.$store.commit("setSearch", this.search)
      },
      destroyed(){
        this.$store.commit("setSearch","");
      }
    }
</script>

<style scoped>

</style>
