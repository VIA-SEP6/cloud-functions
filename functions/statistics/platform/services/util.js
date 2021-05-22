// const weekAgo = (timestamp) => {
//   let checktimestamp = new Date(timestamp);
//   let weekAgo = new Date();
//   weekAgo.setDate(weekAgo.getDate() - 7);
//   let today = new Date();
//   return checktimestamp >= weekAgo && checktimestamp <= today ? true : false;
// };

// const monthAgo = (timestamp) => {
//   let checktimestamp = new Date(timestamp);
//   let monthAgo = new Date();
//   monthAgo.setMonth(monthAgo.getMonth() - 1);
//   monthAgo.setHours(0, 0, 0, 0);
//   let today = new Date();
//   return checktimestamp >= monthAgo && checktimestamp <= today ? true : false;
// };

// const yearAgo = (timestamp) => {
//   let checktimestamp = new Date(timestamp);
//   let yearAgo = new Date();
//   yearAgo.setFullYear(yearAgo.getFullYear - 1);
//   let today = new Date();
//   return checktimestamp >= yearAgo && checktimestamp <= today ? true : false;
// };
// module.exports = { weekAgo, monthAgo, yearAgo };
