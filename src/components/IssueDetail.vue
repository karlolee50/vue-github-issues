<template>
  <div class="container">
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <h2>
            <span>
              {{ issue.title }}
            </span>
             <span class="text-muted">
               #{{ issue.number }}
             </span>
          </h2>
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
          {{ issue.user.login }} opened this issue {{ formatDate(issue.created_at) }}</b-col>
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
                <h6 class="mb-0">{{ issue.user.login }} commented {{ formatDate(issue.created_at) }}</h6>
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
import api from '../helpers/github';
import {formatDateHelper} from '../helpers/formatdate';

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
    fetch() {

      api.fetchIssue(this.issueId).then((response) => {
        this.issue = response;
        api.markdownText(this.issue.body).then((response) => {
          this.body = response;
        });
      });

    },

    formatDate(date) {
      return formatDateHelper(date);
    }

  },

  created() {
    this.fetch();
  }
}
</script>

