<template>
  <div class="container">
    <app-header></app-header>
    <div>
      <div>
        <h3 class="blogtitle">{{blog.title}}</h3>
      </div>
      <div>
        <p class="bloginfo"><span>{{blog.createUser}}</span><span>{{blog.createTime}}</span><span>【<a v-bind:href="'/'+blog.category">{{blog.category}}</a>】</span></p>
      </div>
      <div style="padding-left: 20px;padding-right: 20px">
        <div id="content" v-html="blog.content"  class="markdown-body"></div>
      </div>
    </div>
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
            id:this.$store.getters.getId,
            blog:this.$store.getters.getBlog
          }
    },
    created(){
      fetch("/api/blog/getArticle/"+this.id,{
        method:"post",
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(result => {
        if (!result.ok) {
          alert("通信失败，请联系管理员！");
        }
        return result.json()
      }).then(data => {
        if (data.result ===true) {
          this.$store.commit("setBlog",data.blog);
        }
      })
    },
      components:{
        "app-header":Header,
        "app-footer":Footer
      }
    }
</script>

<style scoped>
  .blogtitle { font-size: 16px }
  .blogtitle { margin: 20px 0 20px 0; font-size: 18px; overflow: hidden; }
  .blogtitle b { color: #F00 }
  .blogtitle {text-align: center}
  .bloginfo { width: 100% }
  .bloginfo {text-align: center}
  .bloginfo { margin-top: 20px; overflow: hidden; color: #999; line-height: 34px; }
  .bloginfo span { margin: 0 5px }
  .bloginfo span a { color: #096 }
</style>
