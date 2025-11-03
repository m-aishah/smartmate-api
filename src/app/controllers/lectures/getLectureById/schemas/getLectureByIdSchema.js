const yup = require("yup");
const selectLectureById = require("./queries/selectLectureById");

const getLectureByIdSchema = yup.object().shape({
  lectureId: yup
    .number()
    .label("Lecture Id")
    .required("The lecture Id is required")
    .typeError("The lecture Id must be a number")
    .test("DoesLectureExist", "The lecture does not exist", async function test(
      lectureId
    ) {
      const isLecture = await selectLectureById({ lectureId });
      if (isLecture) return true;

      return false;
    })
});

module.exports = getLectureByIdSchema;
