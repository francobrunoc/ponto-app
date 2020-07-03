import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const cli = {
  namespaced: true,
  state: {
    clients: []
  },
  mutations: {
    setSelectedClients (state, payload) {
      state.clients = payload
    },
    insertIntoClients (state, payload) {
      state.clients.push(payload)
    },
    clearSelectedClients (state) {
      state.clients = []
    },
    removeClient (state, payload) {
      for (let i = 0; i < state.clients.length; i++) {
        if (payload.id === state.clients[i].clientPeopleId.clientId) {
          state.clients.splice(i, 1)
        }
      }
    }
  }
}

const scl = {
  namespaced: true,
  mutations: {
    setScale (state, payload) {
      state.scale = payload
    },
    setMarkingIn (state, payload) {
      state.scale[payload.weekday].weekday = payload.weekday
      state.scale[payload.weekday].markingIn = payload.markingIn
    },
    setMarkingOut (state, payload) {
      state.scale[payload.weekday].weekday = payload.weekday
      state.scale[payload.weekday].markingOut = payload.markingOut
    },
    clearSelectedScale (state) {
      state.scale = [
        {
          weekday: null,
          markingIn: null,
          markingOut: null
        },
        {
          weekday: null,
          markingIn: null,
          markingOut: null
        },
        {
          weekday: null,
          markingIn: null,
          markingOut: null
        },
        {
          weekday: null,
          markingIn: null,
          markingOut: null
        },
        {
          weekday: null,
          markingIn: null,
          markingOut: null
        },
        {
          weekday: null,
          markingIn: null,
          markingOut: null
        },
        {
          weekday: null,
          markingIn: null,
          markingOut: null
        }
      ]
    }
  },
  state: {
    scale: [
      {
        weekday: null,
        markingIn: null,
        markingOut: null
      },
      {
        weekday: null,
        markingIn: null,
        markingOut: null
      },
      {
        weekday: null,
        markingIn: null,
        markingOut: null
      },
      {
        weekday: null,
        markingIn: null,
        markingOut: null
      },
      {
        weekday: null,
        markingIn: null,
        markingOut: null
      },
      {
        weekday: null,
        markingIn: null,
        markingOut: null
      },
      {
        weekday: null,
        markingIn: null,
        markingOut: null
      }
    ]
  }
}

export default new Vuex.Store({
  modules: {
    cli: cli,
    scl: scl
  }
})
