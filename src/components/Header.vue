<template>
    <div class="container" >
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="/">vue blog</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse " id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="av-item active">
              <router-link class="nav-link" to="/">主页 <span class="sr-only">(current)</span></router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/hot">最热文章</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/aboutWe">关于本站</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                分类
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a class="dropdown-item" v-on:click="changeCategory('java')"  >java</a>
                <a class="dropdown-item" v-on:click="changeCategory('c++')" >c++</a>
                <a class="dropdown-item" v-on:click="changeCategory('python')">python</a>
                <a class="dropdown-item" v-on:click="changeCategory('vue')">vue</a>
                <a class="dropdown-item" v-on:click="changeCategory('javascript')">javascript</a>
              </div>
            </li>
          </ul>

          <ul class="navbar-nav" v-if="!isLogin()">
            <li class="nav-item dropdown" >
              <a class="nav-link dropdown-toggle" href="/"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                文章管理
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <router-link class="dropdown-item" to="/crateArticle" >添加文章</router-link>
                <router-link class="dropdown-item" to="/articleManager">管理文章</router-link>
              </div>
            </li>
          </ul>

          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" v-model="searchValue" type="search" placeholder="全文检索" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" v-on:click="search" type="submit">查找</button>
          </form>

          <div class="navbar-nav ml-auto" v-if="isLogin()">
            <ul class="navbar-nav ml-auto" >
              <li> <router-link to="/login" class="nav-link"> 登陆</router-link></li>
              <li> <router-link to="/register" class="nav-link"> 注册</router-link></li>
            </ul>
          </div>
          <div class="navbar-nav ml-auto" v-else>
            <ul class="navbar-nav">
              <li class="av-item active">
                <router-link class="nav-link" to="/">欢迎 {{this.$store.getters.getUser==null?"":this.$store.getters.getUser.username}}<span class="sr-only">(current)</span></router-link>
              </li>
              <li class="av-item active"> <button @click="loginOut()" class="btn btn-outline-primary"> 退出</button></li>
            </ul>
          </div>


        </div>
      </nav>
    </div>
</template>

<script>
    export default {
        name: "Header",
      data(){
        return {
          username:null,
          searchValue:""
        }
      },
      methods:{
          isLogin:function () {
            return this.$store.getters.getUser == null;
          },
        loginOut:function () {
          this.$store.commit("setUser",null);
          this.$router.push({name:'loginLink'})
        },
        changeCategory:function (value) {
          this.$router.push({name:"categoryLink", params:{cate:value}})
        },
        search:function () {
          if (this.searchValue.trim() !== "") {
            this.$store.commit("setSearch",this.searchValue);
            this.$router.push({name:'searchLink',params:{search:this.searchValue}});
            this.$router.go(0);
          }
        }
      },
      destroyed(){
        this.$store.commit("setSearch","");
      }
    }
</script>

<style scoped>
</style>
