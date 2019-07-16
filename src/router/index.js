import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);

export default new Router({
  routes: [
    {path:"/",name: "homeLink",component:resolve => require(['@/components/Home.vue'],resolve)},
    {path:"/aboutWe",component:resolve => require(['@/components/AboutMe.vue'],resolve)},
    {path:"/login",name:"loginLink",component:resolve => require(['@/components/Login.vue'],resolve)},
    {path:"/register",name:"registerLink",component:resolve => require(['@/components/Register.vue'],resolve)},
    {path:"/hot",name:"hotLink",component:resolve => require(['@/components/Hot.vue'],resolve)},
    {path:"/crateArticle",component:resolve => require(['@/components/CreateArticle.vue'],resolve)},
    {path:"/articleManager",component:resolve => require(['@/components/ArticleManager.vue'],resolve)},
    {path:"/showArticle/:id",name:"showArticleLink",component:resolve => require(['@/components/ShowArticle.vue'],resolve)},
    {path:"/updateArticle",name:"updateArticleLink",component:resolve => require(['@/components/updateArticle.vue'],resolve)},
    {path:"/category/:cate", name:"categoryLink", component:resolve => require(['@/components/category.vue'],resolve)},
    {path:"/search/:search",name:"searchLink",component:resolve => require(['@/components/Search.vue'],resolve)},
    {path:"*",component:resolve => require(['@/components/Home.vue'],resolve)}
  ],
  /*mode:'history'*/
  /*vue 去掉#之前是没错的，去掉#，history模式后 build打包后跳转页面当在动态路径时，
  当刷新页面时会出现空白页面，会出现Uncaught SyntaxError: Unexpected token <错误*/
})
