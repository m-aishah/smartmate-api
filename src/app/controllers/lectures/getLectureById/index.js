const handleAPIError = require("~root/utils/handleAPIError");
const fetchLectureById = require("~root/actions/lectures/fetchLectureById");
const getLectureByIdSchema = require("./schemas/getLectureByIdSchema");

const getLectureById = async (req, res) => {
  const { userId } = req.user;
  const { lectureId } = req.params;

  try {
    await getLectureByIdSchema.validate({ lectureId }, { abortEarly: true });
    const { lecture } = await fetchLectureById({
      userId,
      lectureId
    });

    res.status(200).send({
      lecture
    });
  } catch (err) {
    handleAPIError(res, err);
  }
};

module.exports = getLectureById;
