import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VueRouter from 'vue-router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import IssueDetail from './components/IssueDetail';
import ListIssues from './components/ListIssues';


Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  { 
    path: "/issue/:issueId", 
    name: 'issue', 
    component: IssueDetail,
    props: true
  },
  {
    path: "/status=:status",
    name: 'status',
    component: ListIssues
  }
];

export const router = new VueRouter({
  mode: 'history',

  routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

