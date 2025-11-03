const selectLectureProcessStatus = require("./queries/selectLectureProcessStatus");

const fetchLectureProcessStatus = async ({ taskId }) => {
  const lectureProcessStatus = await selectLectureProcessStatus({ taskId });

  return {
    lectureProcessStatus
  };
};

module.exports = fetchLectureProcessStatus;
