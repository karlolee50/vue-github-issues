<template>
  <div class="container">
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <h1>{{ issue.title }} #{{ issue.number }}</h1>
        </b-col>
        <div class="w-100"></div>
        <b-col>
            <b-badge pill variant="success" v-if="issue.state === 'open'"> 
              <b-icon icon="exclamation-circle" title="Open issue" /> Open
            </b-badge>
            <b-badge pill variant="danger" v-else> 
              <b-iconstack title="Closed issue">
                <b-icon stacked icon="exclamation-circle"></b-icon>
                <b-icon stacked icon="check" variant="danger" shift-v="2" shift-h="6" scale="0.95"></b-icon>
              </b-iconstack> 
              Closed
            </b-badge>
          {{ issue.user.login }} opened this issue {{ issue.created_at }}</b-col>
      </b-row>
    </b-container>
    <br />
    <b-container class="bv-example-row">
      <b-row>
        <b-col col lg="1"> 
          <b-img :src="issue.user.avatar_url" fluid-grow></b-img> 
        </b-col>

        <b-col>
          <b-card-group deck>
            <b-card header-tag="header">
              <template #header>
                <h6 class="mb-0">{{ issue.user.login }} commented {{ issue.created_at }}</h6>
              </template>
              <b-card-text v-html="body"></b-card-text>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'IssueDetail',

  props: ['issueId'],

  data() {
    return{
      id: 'issueId',
      issue: [],
      body: ''
    }
  },

  methods: {
    async fetch() {
      await axios.get(`https://api.github.com/repos/vuejs/vue/issues/${this.issueId}`, {
        headers: {
          accept: 'application/vnd.github.v3+json'
        }
      })
      .then(response => {
        this.issue = response.data;
      }).catch(err => {
        console.log(err);
      });

      await axios.post(`https://api.github.com/markdown`, {
        headers: {
          accept: 'application/vnd.github.v3+json'
        },
        text: this.issue.body
      })
      .then(response => {
        this.body = response.data;
      }).catch(err => {
        console.log(err);
      });
    }
  },

  created() {
    this.fetch();
  }
}
</script>

