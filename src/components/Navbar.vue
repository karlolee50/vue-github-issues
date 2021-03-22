<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="/">
      {{ owner }}/{{ repo }}
    </b-navbar-brand>
      <b-form inline @submit.prevent="onSubmit">
        <label class="sr-only" for="inline-form-input-name">Repo Owner</label>
        <b-form-input
          id="inline-form-input-repo-owner"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Repo Owner"
          v-model="repoOwner">
        </b-form-input>
        <label class="sr-only" for="inline-form-input-username">Repo Name</label>
        <b-form-input 
          id="inline-form-input-repo-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Repo Name"
          v-model="repoName">
        </b-form-input>
        <b-button variant="primary" type="submit" >Submit</b-button>
      </b-form>
      
    </b-navbar>
  </div>
</template>

<script>
import { router } from '../main';

export default {
  name: 'Navbar',

  props: ['owner', 'repo'],

  data() {
    return {
      repoOwner: '',
      repoName: ''
    }
  },

  methods: {
    onSubmit() {
      this.$emit('issuesChange', [this.repoOwner, this.repoName]);
      router.push({path: '', query: Object.assign({}, this.$route.query, { owner: this.repoOwner, repo: this.repoName }) });
    }
  },


}
</script>

