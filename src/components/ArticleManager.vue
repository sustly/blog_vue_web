<template>
  <div class="container">
    <app-header></app-header>
    <div style="padding-left: 50px;padding-right: 50px">
      <table class="table table-striped"  >
        <thead>
        <tr class="row">
          <th class="col-8">我的博客</th>
          <th class="col-4" style="text-align: center">操作</th>
        </tr>

        </thead>
        <tbody v-for="blog in blogList">
        <tr class="row">
          <td class="col-9"><h3 class="blogtitle">{{blog.title}}</h3></td>
          <td class="col-3">
            <button type="button" v-on:click="updateArticle(blog.id)" class="btn btn-info">修改</button>
            <button type="button" v-on:click="deleteArticle(blog.id)" class="btn btn-danger">删除</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div style="padding-left: 30%">
      <pagination v-bind:records="records" v-bind:per-page="10" v-model="page" v-bind:options="options" >
      </pagination>
    </div>

    <app-footer></app-footer>
  </div>
</template>

<script>
  import Header from "../components/Header"
  import Footer from "../components/Footer"
    export default {
        name: "ArticleManager",
      components:{
        "app-header":Header,
        "app-footer":Footer,
      },
      data(){
        return {
          page:1,
          options:{theme:'bootstrap4',texts:{count:''}},
          records:1,
          blogList:null
        }
      },
      methods:{
        updateArticle:function (id) {
          this.$store.commit("setId",id);
          this.$router.push({name:"updateArticleLink"});
        },
        deleteArticle:function (id) {
          fetch("/api/blog/deleteArticle/" + id,{
            method:"post",
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(result => {
            if (!result.ok) {
              alert("通信失败，请联系管理员！");
            }else {
              this.$router.go(0);
            }
          })
        }
      },
      watch:{
        page:{
          handler(newval, oldval){
            var currentPage = newval -1;
            fetch("/api/blog/getArticleListByTime/" + this.$store.getters.getUser.username +"/"+ currentPage,{
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
              this.records = data.records;
              this.blogList = data.blogList;
            })
          },
          immediate:true
        }
      }
    }
</script>

<style scoped>
  .blogtitle { font-size: 16px }
  .blogtitle { margin: 20px 0 20px 0; font-size: 18px; overflow: hidden; }
  .blogtitle b { color: #F00 }
</style>
