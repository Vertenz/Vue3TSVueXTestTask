import { createStore } from 'vuex'
import axios from 'axios'

interface State {
  people: Array<PeopleModel> | null
}

const store = createStore<State>({
  state: {
    people: null
  },

  mutations: {
    setData(state: State, data: Array<PeopleModel>) {
      state.people = data
    }
  },

  actions: {
    async fetchData({ commit }) {
      try {
        const response = await axios.get('https://swapi.dev/api/people/')
        commit('setData', response?.data?.results)
      } catch (error) {
        console.warn('PeopleStore/fetchData get err: ', error)
      }
    }
  }
})

export default store
