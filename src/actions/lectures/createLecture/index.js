const selectCourseByCourseCode = require("~root/actions/schemaHelpers/queries/selectCourseByCourseCode");
const insertLecture = require("./queries/insertLecture");

const createLecture = async ({
  courseCode,
  userId,
  lectureTitle,
  lectureDescription,
  summaryId,
  recordingId
}) => {
  const { courseId } = await selectCourseByCourseCode({ courseCode });
  const lectureId = await insertLecture({
    courseId,
    userId,
    lectureTitle,
    lectureDescription,
    summaryId,
    recordingId
  });
  return { lectureId };
};

module.exports = createLecture;
