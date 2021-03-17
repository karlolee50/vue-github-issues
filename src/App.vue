<template>
  <div>
    <Navbar :owner="owner" :repo="repo"></Navbar>
    <div id="app" class="container">
      <ListIssues :ROOT_URL="ROOT_URL" ></ListIssues>
    </div>
  </div>
</template>

<script>
import ListIssues from './components/ListIssues.vue';
import Navbar from './components/Navbar';

const OWNER = 'vuejs';
const REPO = 'vue';

export default {
  name: 'App',

  components: {
    ListIssues,
    Navbar
  },

  data() {
    return {
      owner : `${OWNER}`,
      repo : `${REPO}`,
      ROOT_URL: `https://api.github.com/repos/${OWNER}/${REPO}/issues`
    }
  }
}
</script>

