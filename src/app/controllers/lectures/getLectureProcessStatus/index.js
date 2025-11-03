const handleAPIError = require("~root/utils/handleAPIError");
const fetchLectureProcessStatus = require("~root/actions/lectures/fetchLectureProcessStatus");

const getLectureProcessStatus = async (req, res) => {
  const { taskId } = req.params;

  try {
    const { lectureProcessStatus } = await fetchLectureProcessStatus({
      taskId
    });

    return res.status(200).send(lectureProcessStatus);
  } catch (err) {
    return handleAPIError(res, err);
  }
};

module.exports = getLectureProcessStatus;
