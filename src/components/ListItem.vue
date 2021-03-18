<template>
  <div>
    <b-list-group>
      <div v-for="issue in issues" :key="issue.id">
      <b-list-group-item v-if="!issue.pull_request" >
          <b-icon icon="exclamation-circle" variant="success" title="Open issue" v-if="issue.state==='open'" />
          <b-iconstack v-else title="Closed issue">
            <b-icon stacked icon="exclamation-circle" variant="danger" ></b-icon>
            <b-icon stacked icon="check" variant="danger" shift-v="2" shift-h="6" scale="0.95"></b-icon>
          </b-iconstack>
          <router-link :to="{ name: 'issue', params: { issueId: issue.number }}"> {{ issue.title }}</router-link>

          <div v-for="label in issue.labels" :key="label.id" style="display: inline-block; padding: 2px;">
            <b-badge :style="{ background: `#${label.color}`, color: 'white' }">
              {{ label.name }}
            </b-badge>
          </div>
          <p class="text-small" v-if="issue.state==='open'" >#{{ issue.number }} opened {{ formatDate(issue.created_at) }} by {{ issue.user.login }}</p>
          <p class="text-small" v-else >#{{ issue.number }} by {{ issue.user.login }} was closed {{ formatDate(issue.created_at) }} </p>
      </b-list-group-item>
      </div>
    </b-list-group>
  </div>
  
</template>

<script>
import moment from 'moment';

export default {
  name: 'ListItem',

  props: ['issues'],

  methods: {
    formatDate(date) {
      let currentMonth = moment().month();
      let issueMonth = moment(date).month();
      let currentYear = moment().year();
      let issueYear = moment(date).year();

      if (currentMonth === issueMonth && currentYear === issueYear) {
        return moment(date).fromNow();
      } else if (currentMonth !== issueMonth && currentYear === issueYear) {
        return ` on ${moment(date).format("MMM D")}`;
      } else {
        return ` on ${moment(date).format("MMM D, YYYY")}`;
      }
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