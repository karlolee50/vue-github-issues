import moment from 'moment';

export function formatDateHelper(date) {
    let currentMonth = moment().month();
    let issueMonth = moment(date).month();
    let currentYear = moment().year();
    let issueYear = moment(date).year();
  
    if (currentMonth === issueMonth && currentYear === issueYear) {
      return moment(date).fromNow();
    } else if (currentMonth !== issueMonth && currentYear === issueYear) {
      return ` on ${moment(date).format("D MMM")}`;
    } else {
      return ` on ${moment(date).format("MMM D, YYYY")}`;
    }
  }
