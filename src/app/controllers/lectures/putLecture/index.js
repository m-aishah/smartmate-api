const handleAPIError = require("~root/utils/handleAPIError");
const modifyLecture = require("~root/actions/lectures/modifyLecture");
const putLectureSchema = require("./schemas/putLectureSchema");

const putLecture = async (req, res) => {
  const { userId } = req.user;
  const { lectureId } = req.params;
  const {
    lectureTitle,
    lectureDescription,
    isFavourite,
    isArchived,
    isDeleted,
    isPinned
  } = req.body;

  try {
    await putLectureSchema.validate(
      {
        lectureTitle,
        lectureDescription,
        isFavourite,
        isArchived,
        isDeleted,
        isPinned
      },
      {
        abortEarly: false
      }
    );

    const updatedLecture = await modifyLecture({
      lectureId,
      userId,
      lectureTitle,
      lectureDescription,
      isFavourite,
      isArchived,
      isDeleted,
      isPinned
    });

    res.status(201).send({
      success: true,
      message: "Lecture updated successfully",
      lecture: updatedLecture
    });
  } catch (err) {
    handleAPIError(res, err);
  }
};

module.exports = putLecture;
