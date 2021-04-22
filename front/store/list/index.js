import Vue from 'vue'

export const state = () => ({
  list: []
})

export const getters = () => ({
	list: state => state.list
})

export const mutations = {
	GET_CHARACTER_LIST: (state, payload) => {
		Vue.set(state, 'list', payload)
	}
}

export const actions = {
	async getCharacterList({ commit }) {
		await this.$axios.get('/api/test').then(response => {
			commit('GET_CHARACTER_LIST', response.data);
		});
	},
}