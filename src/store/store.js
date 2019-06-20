import Vue from 'vue'
import Vuex from 'vuex'
import CreatePersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    user:null,
    page:null
  },
  getters:{
    getUser:state => {
      return state.user
    },
    getPage:state => {
      return state.page
    }
  },
  mutations:{
    setUser:(state,user) =>{
      state.user = user
    },
    setPage:(state,page) =>{
      state.page = page
    }
  },
  plugins:[CreatePersistedState({
      storage: window.sessionStorage
  })]
});
