<template>
  <div class="container">
    <app-header></app-header>
    <div>
      <div>
        <h3 class="blogtitle">{{blog.title}}</h3>
      </div>
      <div>
        <p class="bloginfo"><i class="avatar"></i><span>{{blog.createUser}}</span><span>{{blog.createTime}}</span><span>【<a href="/">设计制作</a>】</span></p>>
      </div>
      <div>
        <div id="content" v-html="blog.content" class="markdown-body"></div>
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
            id:this.$route.params.id,
            blog:null
          }
    },
    created(){
      fetch("/api/blog/get/"+this.id,{
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
          this.blog = data.blog
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
  .blogtitle { margin: 0 0 10px 0; font-size: 18px; overflow: hidden; }
  .blogtitle b { color: #F00 }
  .bloginfo { width: 100% }
  .bloginfo { margin-top: 20px; overflow: hidden; color: #999; line-height: 34px; }
  .bloginfo span { margin: 0 5px }
  .bloginfo span a { color: #096 }
  .avatar { position: relative; float: left; width: 30px; height: 30px; border-radius: 100%; padding: 2px; display: block; background: -webkit-linear-gradient(bottom left, rgba(0,153,255,.9), rgba(42,228,197,.7)); background: -o-linear-gradient(bottom left, rgba(0,153,255,.9), rgba(42,228,197,.7)); background: linear-gradient(to top right, rgba(0,153,255,.9), rgba(42,228,197,.7)); }
  .avatar img { width: 100%; border-radius: 50%; }
</style>
