import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  userName: localStorage.getItem('userName') || '',
  uid: null,
};

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  /* eslint-disable no-param-reassign */
  saveUserName(newState, { userName }) {
    localStorage.setItem('userName', userName);
    newState.userName = userName;
  },
  saveUserId(newState, { uid }) {
    newState.uid = uid;
  },
};

// actions are functions that causes side effects and can involve
// asynchronous operations.
// const actions = {
//   saveUserName: ({ commit }) => commit('saveUserName'),
// };

// getters are functions
// const getters = {
  // evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
// };

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
 // getters,
 // actions,
  mutations,
});
