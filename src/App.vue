<template>
  <div>
    <Navbar :owner="owner" :repo="repo" @issuesChange="newIssues"></Navbar>
    <div id="app" class="container">
      <div v-if="$route.path === '/'">
      <ListIssues :ROOT_URL="ROOT_URL" :owner="owner" :repo="repo" ></ListIssues>
      </div>
      <div v-else>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import ListIssues from './components/ListIssues.vue';
import Navbar from './components/Navbar';

export default {
  name: 'App',

  components: {
    ListIssues,
    Navbar
  },

  data() {
    return {
      ROOT_URL: `https://api.github.com/repos/${this.owner}/${this.repo}/issues`,
    }
  },
  
  methods: {
    newIssues(newRepo) {
      this.owner = newRepo[0];
      this.repo = newRepo[1];
      this.ROOT_URL = `https://api.github.com/repos/${this.owner}/${this.repo}/issues`
    }
  },

  created() {
    this.newOwner = this.$route.query.owner;
    this.newRepo = this.$route.query.repo;
    this.owner = !this.newOwner ? 'vuejs' : this.newOwner;
    this.repo = !this.newRepo ? 'vue' : this.newRepo;
  }
}
</script>

