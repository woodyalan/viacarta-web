import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
    token: null,
    user: null,
    menus: null,
    backToList: false
}

const mutations = {
    updateToken(state, token) {
        state.token = token
    },
    updateUser(state, user) {
        state.user = user
    },
    updateMenus(state, menus) {
        state.menus = menus
    },
    updateBackToList(state, backToList) {
        state.backToList = backToList
    }
}

const actions = {
    setToken(state, token) {
        state.commit('updateToken', token);
    },
    setUser(state, user) {
        state.commit('updateUser', user);
    },
    setBackToList(state, back) {
        state.commit('updateBackToList', back);
    },
    setMenus(state, menus) {
        state.commit('updateMenus', menus);
    },
    resetData(state) {
        state.commit('updateToken', null);
        state.commit('updateUser', null);
        state.commit('updateMenus', null);
        state.commit('updateBackToList', false);
    }
}

const badMutations = ['updateBackToList'];

export default new Vuex.Store({
    state,
    mutations,
    actions,
    plugins: [
        createPersistedState({
            storage: window.localStorage,
            filter: mutation => badMutations.indexOf(mutation.type) === -1
        })
    ]
});
