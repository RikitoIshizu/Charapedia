import Vue from 'vue'

export const state = () => ({
    isLoading: false
});

export const getters = () => ({
    isLoading: state => state.isLoading,
});

export const mutations = {
    TOGGLE_LOADING: (state, payload) => {
        Vue.set(state, 'isLoading', payload);
    },
};

export const actions = {
    toggleLoading({ commit }, payload) {
        commit('TOGGLE_LOADING', payload);
    }
}