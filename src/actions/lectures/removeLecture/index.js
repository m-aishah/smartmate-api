const selectNecessaryIds = require("./queries/selectNecessaryIds");
const deleteLecture = require("./queries/deleteLecture");

const removeLecture = async ({ lectureId }) => {
  const {
    summaryId,
    recordingId,
    summarisationTaskId
  } = await selectNecessaryIds({
    lectureId
  });

  await deleteLecture({
    recordingId,
    summaryId,
    summarisationTaskId,
    lectureId
  });
};

module.exports = removeLecture;
