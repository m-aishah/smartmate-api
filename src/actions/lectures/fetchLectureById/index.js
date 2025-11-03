const selectLectureById = require("./queries/selectLectureById");

const fetchLectureById = async ({ userId, lectureId }) => {
  const lecture = await selectLectureById({ userId, lectureId });

  return { lecture };
};

module.exports = fetchLectureById;
