<template>
  <div class="container">
    <DetailHeader :issue="oneIssue"/>
    <br />
    <DetailContent :issue="oneIssue" :body="issueBody" />
  </div>
</template>

<script>
// import api from '../helpers/github';
import { mapActions, mapGetters } from 'vuex';

import DetailHeader from './detail/DetailHeader';
import DetailContent from './detail/DetailContent';

export default {
  name: 'IssueDetail',

  // props: ['issueId', 'owner', 'repo'],

  components: {
    DetailHeader,
    DetailContent
  },

  // data() {
  //   return{
  //     id: 'issueId',
  //     issue: [],
  //     body: ''
  //   }
  // },

  methods: {
    ...mapActions(['fetchOneIssue']),

  //   fetch() {
  //     api.fetchIssue(this.issueId, this.owner, this.repo).then((response) => {
  //       this.issue = response;
  //       api.markdownText(this.issue.body).then((response) => {
  //         this.body = response;
  //       });
  //     });
  //   }
  },

  computed: {
    ...mapGetters(['oneIssue', 'issueBody'])
  },

  created() {
    // this.fetch();
    this.fetchOneIssue();
  }
}
</script>

