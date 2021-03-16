<template>
  <div class="head">
    <b-list-group>
      <b-list-group-item v-for="issue in issues" :key="issue.id">
        {{ issue.title }}
        <br/>
        <br/>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import axios from 'axios';

const OWNER = 'vuejs';
const REPO = 'vue';
const ROOT_URL = `https://api.github.com/repos/${OWNER}/${REPO}/issues`;

export default {
  name: 'ListIssues',
  data() {
    return {
      issues: []
    }
  },
  methods: {
    async fetch() {
      await axios.get(ROOT_URL, {
        headers: {
          accept: 'application/vnd.github.v3+json'
        },
        params: {
          per_page: 20
        }
      })
      .then(response => {
        this.issues = response.data;
      }).catch(err => {
        console.log(err);
      });
    },
  },
  created() {
    this.fetch();
  }
}
</script>

<style scoped>
.head {
  padding-top: 40px;
}
</style>