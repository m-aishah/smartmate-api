const selectUserSummaries = require("./queries/selectUserSummaries");

const fetchUserSummaries = async ({ userId }) => {
  const summaries = await selectUserSummaries({ userId });

  return { summaries };
};

module.exports = fetchUserSummaries;
