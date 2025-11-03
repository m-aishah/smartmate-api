const selectUserDeadlines = require("./queries/selectUserDeadlines");

const fetchUserDeadlines = async ({ userId }) => {
  const deadlines = await selectUserDeadlines({ userId });

  return { deadlines };
};

module.exports = fetchUserDeadlines;
