
const state = {
  page: 1,
  status: '',
};

const getters = {
  currentPage: state => state.page,

  currentStatus: state => state.status
};

const actions = {
  goToOnePage({ commit }, page) {
    commit('setPage', page);
    window.localStorage.setItem('current_page', page);
  },
};

const mutations = {
  setPage: (state, page) => {
    state.page = page;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}