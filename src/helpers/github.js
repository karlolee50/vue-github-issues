import axios from 'axios';

const OWNER = 'vuejs';
const REPO = 'vue';

export default {
  // fetchAll(pageNumber, owner, repo, status) {
  //   const promise = axios.get(`https://api.github.com/repos/${owner}/${repo}/issues`, {
  //     headers: {
  //       accept: 'application/vnd.github.v3+json'
  //     },
  //     params: {
  //       per_page: 40,
  //       page: pageNumber,
  //       state: status
  //     }
  //   });

  //   const issuesData = promise.then(response => response.data);

  //   return issuesData;
  // },

  fetchAll(pageNumber, owner, repo, status) {
    return axios.get(`https://api.github.com/repos/${owner}/${repo}/issues`, {
      headers: {
        accept: 'application/vnd.github.v3+json'
      },
      params: {
        per_page: 40,
        page: pageNumber,
        state: status
      }
    });

    // const issuesData = promise.then(response => response.data);

    // return issuesData;
  },

  // fetchIssue(issueId, owner, repo){
  //   const promise = axios.get(`https://api.github.com/repos/${owner}/${repo}/issues/${issueId}`, {
  //     headers: {
  //       accept: 'application/vnd.github.v3+json'
  //     }
  //   });

  //   const issueData = promise.then(response => response.data);

  //   return issueData;
  // },

  fetchIssue(issueId, owner, repo){
    return axios.get(`https://api.github.com/repos/${owner}/${repo}/issues/${issueId}`, {
      headers: {
        accept: 'application/vnd.github.v3+json'
      }
    });
  },

  markdownText(text) {
    return axios.post(`https://api.github.com/markdown`, {
      headers: {
        accept: 'application/vnd.github.v3+json'
      },
      text: text
    });
  }

  // markdownText(text) {
  //   const promise = axios.post(`https://api.github.com/markdown`, {
  //     headers: {
  //       accept: 'application/vnd.github.v3+json'
  //     },
  //     text: text
  //   });

  //   const body = promise.then(response => response.data);

  //   return body;
  // }
}