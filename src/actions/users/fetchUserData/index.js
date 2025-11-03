const selectUserData = require("./queries/selectUserData");

const fetchUserData = async ({ userId }) => {
  const userData = await selectUserData({ userId });

  return userData;
};

module.exports = fetchUserData;
