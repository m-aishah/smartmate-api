const insertDeadline = require("./queries/insertDeadline");
const selectCourseIdByCourseCode = require("./queries/selectCourseIdByCourseCode");

const createDeadline = async ({
  userId,
  title,
  date,
  courseCode,
  // eslint-disable-next-line no-unused-vars
  courseName
}) => {
  const { courseId } = await selectCourseIdByCourseCode({
    courseCode
  });

  const deadlineId = await insertDeadline({
    userId,
    title,
    date,
    courseId
  });
  return { deadlineId };
};

module.exports = createDeadline;
