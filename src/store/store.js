import Vue from 'vue'
import Vuex from 'vuex'
import PersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    user:null,
    page:null,
    blog:null,
    id:0
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
    },
    getId:state => {
      return state.id
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
    },
    setId:(state,id) =>{
      state.id = id
    }
  },
  plugins:[PersistedState({
      storage: window.sessionStorage
  })]
});
