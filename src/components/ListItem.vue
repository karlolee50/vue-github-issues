<template>
  <div>
    <b-list-group>
      <b-list-group-item  v-for="issue in issues" :key="issue.id">
          <b-icon icon="exclamation-circle-fill" title="Open issue" v-if="issue.state==='open'" />
          <b-icon icon="check2" title="Closed issue" v-else />
          {{ issue.title }}
          <div v-for="label in issue.labels" :key="label.id" style="display: inline-block; padding: 2px;">
            <b-badge pill variant="primary">
              {{ label.name }}
            </b-badge>
          </div>
        <p class="text-small">#{{ issue.number }} opened {{ moment(issue.created_at).fromNow() }} by {{ issue.user.login }}</p>
      </b-list-group-item>
    </b-list-group>
  </div>
  
</template>

<script>
import moment from 'moment';

export default {
  name: 'ListItem',

  props: ['issues'],

  methods: {
    moment(date) {
      
      return moment(date);
    }
  }
}
</script>

<style scoped>
.text-small {
  font-size: 12px !important;
  margin-bottom: 0;
}
</style>