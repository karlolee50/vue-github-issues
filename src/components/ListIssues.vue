<template>
  <div class="head">
    <div style="text-align: right">
      <b-button-group>
        <b-button
          @click="onChangeStatus(STATUS.ALL)"
          :variant="status ===STATUS.ALL ? isActive : ''" >
          All
        </b-button>
        <b-button
          @click="onChangeStatus(STATUS.OPEN)"
          :variant="status ===STATUS.OPEN ? isActive : ''" >
          Open
        </b-button>
        <b-button
          @click="onChangeStatus(STATUS.CLOSED)"
          :variant="status ===STATUS.CLOSED ? isActive : ''" >
          Closed
        </b-button>
      </b-button-group>
    </div>
    <ListItem :issues="issues" />
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

import { router } from '../main';

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
      isActive: 'success'
    }
  },
  
  methods: {
    fetch(pageNumber, status) {
      api.fetchAll(pageNumber, status).then((response) => {
        this.issues = response;
      });
    },

    goToPage(value) {
      this.currentPage = value;
      this.fetch(this.currentPage, this.status);
      setTimeout(() => {
        window.scrollTo(0,0);
      }, 300);
    },

    onChangeStatus(value) {
      this.status = value;
      router.push({ path: '', query: { status: `${this.status}` } })
      this.fetch(this.currentPage, this.status);
    },
  },

  computed: {
    rows() {
      return this.issues.length;
    },
  },

  created() {
    this.STATUS = {
      ALL: "all",
      OPEN: "open",
      CLOSED: "closed"
    };
    this. currentStatusQuery = this.$route.query.status;
    this.status = !this.currentStatusQuery ? this.STATUS.ALL : this.currentStatusQuery;
    this.fetch(this.currentPage, this.status);
  }
}
</script>
<style scoped>
.head {
  padding-top: 40px;
}
</style>