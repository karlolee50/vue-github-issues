<template>
  <div class="container">
    <DetailHeader :issue="issue"/>
    <br />
    <DetailContent :issue="issue" :body="body" />
  </div>
</template>

<script>
import api from '../helpers/github';

import DetailHeader from './detail/DetailHeader';
import DetailContent from './detail/DetailContent';

export default {
  name: 'IssueDetail',

  props: ['issueId', 'owner', 'repo'],

  components: {
    DetailHeader,
    DetailContent
  },

  data() {
    return{
      id: 'issueId',
      issue: [],
      body: ''
    }
  },

  methods: {
    fetch() {
      api.fetchIssue(this.issueId, this.owner, this.repo).then((response) => {
        this.issue = response;
        api.markdownText(this.issue.body).then((response) => {
          this.body = response;
        });
      });
    }
  },

  created() {
    this.fetch();
  }
}
</script>

