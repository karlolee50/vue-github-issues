<template>
  <div class="head">
    <ListItem :issues="issues"></ListItem>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      @change="goToPage"
      align="center"
      style="padding-top: 10px"
      aria-controls="my-table"
    />
  </div>
</template>

<script>
import axios from 'axios';
import ListItem from './ListItem';

export default {
  name: 'ListIssues',

  props: ['ROOT_URL'],

  components: {
    ListItem
  },

  data() {
    return {
      issues: [],
      perPage: 5,
      currentPage: 1
    }
  },
  
  methods: {
    async fetch(pageNumber) {
      await axios.get(this.ROOT_URL, {
        headers: {
          accept: 'application/vnd.github.v3+json'
        },
        params: {
          per_page: 40,
          page: pageNumber,
          state: 'all'
        }
      })
      .then(response => {
        this.issues = response.data;
      }).catch(err => {
        console.log(err);
      });
    },
    goToPage(value) {
      this.currentPage = value;
      this.fetch(this.currentPage);
      setTimeout(() => {
        window.scrollTo(0,0);
      }, 300);
    }
    
  },

  computed: {
      rows() {
        return this.issues.length;
      }
  },

  created() {
    this.fetch(this.currentPage);
  }
}
</script>
<style scoped>
.head {
  padding-top: 40px;
}
</style>