<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col col lg="1"> 
          <b-img :src="issue.user.avatar_url" fluid-grow></b-img> 
        </b-col>

        <b-col>
          <b-card-group deck>
            <b-card header-tag="header">
              <template #header>
                <h6 class="mb-0">{{ issue.user.login }} commented {{ formatDate(issue.created_at) }}</h6>
              </template>
              <b-card-text v-html="body"></b-card-text>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import {formatDateHelper} from '../../helpers/formatdate';

export default {
  name: 'DetailContent',

  props: ['issue', 'body'],

  methods: {
    formatDate(date) {
      return formatDateHelper(date);
    }
  }
}
</script>