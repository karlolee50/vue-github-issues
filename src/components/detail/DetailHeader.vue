<template>
  <div>
    <b-row>
      <b-col>
        <h2>
          <span>
            {{ issue.title }}
          </span>
            <span class="text-muted">
              #{{ issue.number }}
            </span>
        </h2>
      </b-col>
      <div class="w-100"></div>
      <b-col md="auto">
          <b-badge pill variant="success" v-if="issue.state === 'open'"> 
            <b-icon icon="exclamation-circle" title="Open issue" /> Open
          </b-badge>
          <b-badge pill variant="danger" v-else> 
            <b-iconstack title="Closed issue">
              <b-icon stacked icon="exclamation-circle"></b-icon>
              <b-icon stacked icon="check" variant="danger" shift-v="2" shift-h="6" scale="0.95"></b-icon>
            </b-iconstack> 
            Closed
          </b-badge>
        {{ issue.user.login }} opened this issue {{ formatDate(issue.created_at) }}
      </b-col>
      <b-col>
        <Labels :labels="issue.labels"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {formatDateHelper} from '../../helpers/formatdate';
import Labels from '../Labels';

export default {
  name: 'DetailHeader',

  components: {
    Labels
  },

  props: ['issue'],

  methods: {
    formatDate(date) {
      return formatDateHelper(date);
    }
  },
}
</script>