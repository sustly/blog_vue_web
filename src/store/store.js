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
    }
  },
  mutations:{
    setUser:(state,user) =>{
      state.user = user
    }
  },
  plugins:[CreatePersistedState({
      storage: window.sessionStorage
  })]
});
