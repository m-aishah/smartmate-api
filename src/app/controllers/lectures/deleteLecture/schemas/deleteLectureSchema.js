const yup = require("yup");
const selectLectureById = require("./queries/selectLectureById");

const deleteLectureSchema = yup.object().shape({
  lectureId: yup
    .number()
    .integer()
    .required()
    .label("Lecture ID")
    .typeError("The lecture ID must be an integer")
    .test(
      "doesLectureExist",
      "The lecture does not exist, make sure the lectureId is valid ",
      async function doesLectureExist(lectureId) {
        if (!lectureId) return false;
        const count = await selectLectureById({ lectureId });
        if (count === 0) return false;
        return true;
      }
    )
    .test(
      "isLectureDeleted",
      "The lecture is already deleted",
      async function isLectureDeleted(lectureId) {
        if (!lectureId) return false;
        const { isDeleted } = await selectLectureById({ lectureId });
        if (isDeleted) return false;
        return true;
      }
    )
});

module.exports = deleteLectureSchema;
