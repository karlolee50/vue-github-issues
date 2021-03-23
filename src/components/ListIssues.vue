<template>
  <div class="head">
    <div style="text-align: right">
      <b-button-group>
        <b-button
          @click="onChangeFilter(STATUS.ALL)"
          :variant="currentState ===STATUS.ALL ? isActive : ''" >
          All
        </b-button>
        <b-button
          @click="onChangeFilter(STATUS.OPEN)"
          :variant="currentState ===STATUS.OPEN ? isActive : ''" >
          Open
        </b-button>
        <b-button
          @click="onChangeFilter(STATUS.CLOSED)"
          :variant="currentState ===STATUS.CLOSED ? isActive : ''" >
          Closed
        </b-button>
      </b-button-group>
    </div>
    <!-- <ListItem :issues="issues" /> -->
    <ListItem :issues="allIssues" :ROOT_URL="ROOT_URL"></ListItem>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      @change="goToAnotherPage"
      align="center"
      style="padding-top: 10px"
      aria-controls="my-table"
    />
    
  </div>
</template>

<script>
import api from '../helpers/github';
import ListItem from './ListItem';

import { router } from '../router';
import { mapActions, mapGetters } from 'vuex';

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
      currentPage: 1,
      status: '',
      isActive: 'success',
      owner: '',
      repo: ''
    }
  },
  
  methods: {
    ...mapActions (['fetchAllIssues', 'goToAnotherPage', 'onChangeFilter']),

    // fetch(pageNumber) {
    //   this.currentStatusQuery = this.$route.query.status;
    //   this.status = !this.currentStatusQuery ? this.STATUS.ALL : this.currentStatusQuery;
    //   this.newOwner = this.$route.query.owner;
    //   this.newRepo = this.$route.query.repo;
    //   this.owner = !this.newOwner ? 'vuejs' : this.newOwner;
    //   this.repo = !this.newRepo ? 'vue' : this.newRepo;
    //   api.fetchAll(pageNumber, this.owner, this.repo, this.status).then((response) => {
    //     this.issues = response.data;
    //   });
    // },

    // goToPage(value) {
    //   this.currentPage = value;
    //   this.fetch(this.currentPage, this.owner, this.repo, this.status);
    //   setTimeout(() => {
    //     window.scrollTo(0,0);
    //   }, 300);
    // },

    // onChangeStatus(value) {
    //   this.status = value;
    //   router.push({ path: '', query: Object.assign({}, this.$route.query, { status: `${this.status}` }) });
    //   this.fetch(this.currentPage, this.owner, this.repo, this.status);
    // },
  },

  computed: {
    ...mapGetters(['allIssues', 'currentState']),

    rows() {
      return this.allIssues.length;
    },
    
  },

  watch: {
    ROOT_URL(newVal) {
      this.currentPage = 1;
      this.owner = this.newOwner;
      this.repo = this.$route.query.repo;
      this.fetch(this.currentPage, this.$route.query.owner, this.$route.query.repo);
    }
  },

  created() {
    this.STATUS = {
      ALL: "all",
      OPEN: "open",
      CLOSED: "closed"
    };
    // this.fetch(this.currentPage, this.owner, this.repo, this.status);
    this.fetchAllIssues();
  }

}
</script>
<style scoped>
.head {
  padding-top: 40px;
}
</style>