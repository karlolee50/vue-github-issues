import api from '../../helpers/github';
import  {router}  from '../../router';

const state = {
  issues: [],
  issue: [],
  owner: 'vuejs',
  repo: 'vue',
  status: 'all',
  pageNumber: 1,
  body: ''
};

const getters = {
  allIssues: state => state.issues,

  oneIssue: state => state.issue,

  currentState: state => state.status,

  issueBody: state => state.body,

  getOwner: state => state.owner,

  getRepo: state => state.repo

};

const actions = {
  async fetchAllIssues({ commit, state }) {
    const response = await api.fetchAll(1, state.owner, state.repo, state.status);
    commit('setIssues', response.data);
  },

  async goToAnotherPage({ commit, state }, pageNum){
    commit('setPage', pageNum);
    const response = await api.fetchAll(state.page, state.owner, state.repo, state.status);
    commit('setIssues', response.data);
    setTimeout(() => {
      window.scrollTo(0,0);
    }, 200);
  },

  async onChangeFilter({ commit, state }, status) {
    commit('setStatus', status);
    router.push({ path: '', query: Object.assign({}, router.currentRoute.query, { status: state.status }) });
    const response = await api.fetchAll(state.page, state.owner, state.repo, state.status);
    commit('setIssues', response.data);
  },

  async fetchOneIssue({ commit, state} ) {
    const currentId = router.currentRoute.query.issueId;
    const response = await api.fetchIssue(currentId, state.owner, state.repo);
    const responseBody = await api.markdownText(response.data.body);
    commit('setIssue', response.data);
    commit('setBody', responseBody.data);
  },

  changeIssueRepo({ commit, state }, payload) {
    console.log(payload);
    // commit('setOwner', owner);
    // commit('setRepo', repo);
  }
};

const mutations = {
  setIssues: (state, issues) => {
    state.issues = issues;
  },

  setPage: (state, page) => {
    state.page = page;
  },

  setStatus: (state, status) => {
    state.status = status;
  },

  setIssue: (state, issue) => {
    state.issue = issue;
  },

  setBody: (state, body) => {
    state.body = body;
  },

  setOwner: (state, owner) => {
    state.owner = owner;
  },

  setRepo: (state, repo) => {
    state.repo = repo;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}