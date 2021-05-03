import Vue from "vue";
import Vuex from "vuex";
import API from "../api"
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    books: [],
    token: localStorage.getItem("token") || "",
    isAuthenicated: false,
  },
  getters: {
    gettokenfromstate: state => {
      return state.token
    }
  },
  mutations: {
    setToken(state, token){
      state.token = token
    },
    load(state) {
      if (state.token) {
        API.get("/api/book/")
          .then((resp) => {
            if (resp.status === 200) { state.books = resp.data; }
            console.log(resp.data)
          })
      }
    },
    signup(data) {
      API.post('/api/auth/users/', data)
        .then(resp => {
          if (resp.status == 201) {
            console.log('success')
          }
          localStorage.setItem("user", resp.data.username)
        }).catch(err => console.log(err))
    },
    changeAuth(state) {
      state.isAuthenicated = true
    },
    logclean() {
      localStorage.removeItem('token')
    }
  },
  actions: {
    login({ commit }, form) {
      API.post("/api/auth/token/login/", { ...form })
        .then(resp => {
          if (resp.status == 200) {
            commit("changeAuth")
            commit("setToken", resp.data.auth_token)
            localStorage.setItem('token', resp.data.auth_token)
          }
        })
    },
    logout({ commit }) {
      API.post("/api/auth/token/logout/")
        .then(resp => {
          if (resp.status == 204) {
            commit("logclean")
          }
        }).catch(err => this.$message(err))
    },
    signup({ commit }, data) {
      commit("signup", data)
    },
    loadbooks({ commit }) {
      commit("load")
    }
  },
  modules: {},
});
