const selectCourseByCourseCode = require("~root/actions/schemaHelpers/queries/selectCourseByCourseCode");
const insertRecording = require("./queries/insertRecording");

const createRecording = async ({
  courseCode,
  userId,
  recordingType,
  recordingMicrosoftTeamsUrl = "",
  recordingFile
}) => {
  const { courseId } = await selectCourseByCourseCode({ courseCode });
  const recordingId = await insertRecording({
    courseId,
    userId,
    recordingType,
    recordingMicrosoftTeamsUrl,
    recordingFile
  });

  return recordingId;
};

module.exports = createRecording;
