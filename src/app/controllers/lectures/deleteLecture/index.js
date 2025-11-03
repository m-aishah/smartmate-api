const handleAPIError = require("~root/utils/handleAPIError");
const removeLecture = require("~root/actions/lectures/removeLecture");
const deleteLectureSchema = require("./schemas/deleteLectureSchema");

const deleteLecture = async (req, res) => {
  const { lectureId } = req.params;

  try {
    await deleteLectureSchema.validate(
      { lectureId },
      {
        abortEarly: false
      }
    );

    const response = await removeLecture({ lectureId });

    res.status(204).send(response);
  } catch (err) {
    handleAPIError(res, err);
  }
};

module.exports = deleteLecture;
