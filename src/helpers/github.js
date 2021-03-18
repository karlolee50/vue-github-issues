import axios from 'axios';

const OWNER = 'vuejs';
const REPO = 'vue';
const ROOT_URL = `https://api.github.com/repos/${OWNER}/${REPO}/issues`;

export default {
  fetchAll(pageNumber) {
    const promise = axios.get(ROOT_URL, {
      headers: {
        accept: 'application/vnd.github.v3+json'
      },
      params: {
        per_page: 40,
        page: pageNumber,
        state: 'all'
      }
    });

    const issuesData = promise.then(response => response.data);

    return issuesData;
  },

  fetchIssue(issueId){
    const promise = axios.get(`https://api.github.com/repos/${OWNER}/${REPO}/issues/${issueId}`, {
        headers: {
          accept: 'application/vnd.github.v3+json'
        }
      });

      const issueData = promise.then(response => response.data);

      return issueData;
  },

  markdownText(text) {
    const promise = axios.post(`https://api.github.com/markdown`, {
        headers: {
          accept: 'application/vnd.github.v3+json'
        },
        text: text
      })

      const body = promise.then(response => response.data);

      return body;
  }
}