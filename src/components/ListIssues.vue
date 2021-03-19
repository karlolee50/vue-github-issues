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
import api from '../helpers/github';
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
    fetch(pageNumber) {
      api.fetchAll(pageNumber).then((response) => {
        this.issues = response;
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