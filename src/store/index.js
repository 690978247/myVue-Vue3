import { createStore } from "vuex"

const store = createStore({
  state: {
    sideBar: {
      opened: true
    }
  },
  mutations: {
    TOGGLE_SIDEBAR(state) {
      state.sideBar.opened = !state.sideBar.opened
    }
  },
  actions: {
    toggleSidebar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
  },
  modules: {},
})

export default store