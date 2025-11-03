const selectUserCourses = require("./queries/selectUserCourses");

const fetchUserCourses = async ({ userId }) => {
  const courses = await selectUserCourses({ userId });

  return { courses };
};

module.exports = fetchUserCourses;
