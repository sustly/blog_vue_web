<script src="../router/index.js"></script>
<template>
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">vue blog</a>
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
                <router-link class="dropdown-item" to="/" >java</router-link>
                <router-link class="dropdown-item" to="/">c++</router-link>
                <router-link class="dropdown-item" to="/">python</router-link>
                <router-link class="dropdown-item" to="/">vue</router-link>
                <router-link class="dropdown-item" to="/">javascript</router-link>
              </div>
            </li>
          </ul>

          <ul class="navbar-nav" v-if="!isLogin()">
            <li class="nav-item dropdown" >
              <a class="nav-link dropdown-toggle" href="/"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                文章管理
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <router-link class="dropdown-item" to="/" >java</router-link>
                <router-link class="dropdown-item" to="/">c++</router-link>
                <router-link class="dropdown-item" to="/">python</router-link>
                <router-link class="dropdown-item" to="/">vue</router-link>
                <router-link class="dropdown-item" to="/">javascript</router-link>
              </div>
            </li>
          </ul>

          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="全文检索" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">查找</button>
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
                <router-link class="nav-link" to="/">欢迎 {{username}}<span class="sr-only">(current)</span></router-link>
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
          username:sessionStorage.getItem("user")
        }
      },
      methods:{
          isLogin:function () {
            return sessionStorage.getItem("user") == null;

          },
        loginOut:function () {
          sessionStorage.removeItem("user");
          this.$router.push({name:'loginLink'})
        }
      }
    }
</script>

<style scoped>
</style>
