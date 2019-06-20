import Vue from 'vue'
import Vuex from 'vuex'
import PersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    user:null,
    page:null,
    blog:null
  },
  getters:{
    getUser:state => {
      return state.user
    },
    getPage:state => {
      return state.page
    },
    getBlog:state => {
      return state.blog
    }
  },
  mutations:{
    setUser:(state,user) =>{
      state.user = user
    },
    setPage:(state,page) =>{
      state.page = page
    },
    setBlog:(state,blog) =>{
      state.blog = blog
    }
  },
  plugins:[PersistedState({
      storage: window.sessionStorage
  })]
});
