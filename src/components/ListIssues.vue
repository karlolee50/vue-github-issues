<template>
  <div class="head">
    <ListItem :issues="issues"></ListItem>
  </div>
</template>

<script>
import axios from 'axios';
import ListItem from './ListItem';

const OWNER = 'vuejs';
const REPO = 'vue';
const ROOT_URL = `https://api.github.com/repos/${OWNER}/${REPO}/issues`;

export default {
  name: 'ListIssues',
  components: {
    ListItem
  },

  data() {
    return {
      issues: [],
    }
  },
  
  methods: {
    async fetch() {
      await axios.get(ROOT_URL, {
        headers: {
          accept: 'application/vnd.github.v3+json'
        },
        params: {
          per_page: 40,
          state: 'all'
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