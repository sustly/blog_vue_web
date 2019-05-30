import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import AboutMe from "../components/AboutMe"
import Login from "../components/Login"
import Register from "../components/Register"
import Hot from "../components/Hot"

Vue.use(Router);

export default new Router({
  routes: [
    {path:"/",name: "homeLink",component:Home},
    {path:"/aboutWe",component:AboutMe},
    {path:"/login",name:"loginLink",component:Login},
    {path:"/register",name:"registerLink",component:Register},
    {path:"/hot",name:"hotLink",component:Hot},
    {path:"*",component:Home}
  ],
  mode:'history'
})
