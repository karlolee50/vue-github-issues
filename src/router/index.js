import Vue from 'vue'
import VueRouter from 'vue-router'

import IssueDetail from '../components/IssueDetail';
import ListIssues from '../components/ListIssues';

Vue.use(VueRouter)

const routes = [
  { 
    // path: "/owner=:owner/repo=:repo/issue/:issueId", 
    path: "/issue", 
    name: 'issue', 
    component: IssueDetail,
    props: true
  },
  {
    path: "/status=:status",
    name: 'status',
  },
  {
    path: "/owner=:owner&repo=:repo",
    component: ListIssues
  }
];

export const router = new VueRouter({
  mode: 'history',

  routes
});