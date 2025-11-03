const selectUserLectures = require("./queries/selectUserLectures");

const fetchUserLectures = async ({ userId }) => {
  const lectures = await selectUserLectures({ userId });

  return { lectures };
};

module.exports = fetchUserLectures;
