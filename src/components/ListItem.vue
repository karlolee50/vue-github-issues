<template>
  <div>
    <b-list-group>
      <div v-for="issue in issues" :key="issue.id">
      <b-list-group-item v-if="!issue.pull_request" >
          <b-icon icon="exclamation-circle" variant="success" title="Open issue" v-if="issue.state==='open'" />
          <b-iconstack v-else title="Closed issue">
            <b-icon stacked icon="exclamation-circle" variant="danger" ></b-icon>
            <b-icon stacked icon="check" variant="danger" shift-v="2" shift-h="6" scale="0.95"></b-icon>
          </b-iconstack>
          <!-- <router-link :to="{ name: 'issue', params: { owner: owner,  repo: repo, issueId: issue.number } }"> {{ issue.title }}</router-link> -->
          <router-link :to="{ path: '/issue', query: { owner: owner,  repo: repo, issueId: issue.number } }" append> {{ issue.title }}</router-link>
            <Labels :labels="issue.labels" style="display: inline-block; padding: 2px;" />
          <p class="text-small" v-if="issue.state==='open'" >#{{ issue.number }} opened {{ formatDate(issue.created_at) }} by {{ issue.user.login }}</p>
          <p class="text-small" v-else >#{{ issue.number }} by {{ issue.user.login }} was closed {{ formatDate(issue.created_at) }} </p>
      </b-list-group-item>
      </div>
    </b-list-group>
  </div>
  
</template>

<script>
import {formatDateHelper} from '../helpers/formatdate';

import Labels from './Labels';

export default {
  name: 'ListItem',

  components: {
    Labels
  },

  data() {
    return {
      owner: 'vuejs',
      repo: 'vue'
    }
  },

  props: ['issues', 'ROOT_URL'],

  methods: {
    formatDate(date) {
      return formatDateHelper(date);
    } 
  },

  // watch: {
  //   $route(to, from){
  //     this.owner = to.query.owner;
  //     this.repo = to.query.repo;
  //     console.log(to);
  //     console.log(from);
  //   }
  // },
}
</script>

<style scoped>
.text-small {
  font-size: 12px !important;
  margin-bottom: 0;
}
</style>