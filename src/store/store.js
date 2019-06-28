import Vue from 'vue'
import Vuex from 'vuex'
import PersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    user:null,
    blog:null,
    id:0,
    type:0,
    search:""
  },
  getters:{
    getUser:state => {
      return state.user
    },
    getBlog:state => {
      return state.blog
    },
    getId:state => {
      return state.id
    },
    getType:state => {
      return state.type
    },
    getSearch:state => {
      return state.search
    }
  },
  mutations:{
    setUser:(state,user) =>{
      state.user = user
    },
    setBlog:(state,blog) =>{
      state.blog = blog
    },
    setId:(state,id) =>{
      state.id = id
    },
    setType:(state,type) => {
      state.type = type
    },
    setSearch:(state,search) => {
      state.search = search
    }
  },
  plugins:[PersistedState({
      storage: window.sessionStorage
  })]
});
