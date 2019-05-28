import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import AboutMe from "../components/AboutMe"
import Login from "../components/Login"
import Register from "../components/Register"

Vue.use(Router);

export default new Router({
  routes: [
    {path:"/",component:Home},
    {path:"/aboutMe",component:AboutMe},
    {path:"/login",component:Login},
    {path:"/register",component:Register}
  ],
  mode:'history'
})
