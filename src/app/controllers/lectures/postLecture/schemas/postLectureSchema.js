const yup = require("yup");
const selectCourseByCourseCode = require("~root/actions/schemaHelpers/queries/selectCourseByCourseCode");
const selectUserCourseEnrollment = require("./queries/selectUserCourseEnrollment");

const postLectureSchema = yup.object().shape({
  courseCode: yup
    .string()
    .label("Course Code")
    .required("The course code is required")
    .test(
      "isUserEnrolledInCourse",
      "You are not enrolled in this course",
      async function test(courseCode) {
        const { userId } = this.parent;
        try {
          const { courseId } = await selectCourseByCourseCode({ courseCode });
          const isEnrolled = await selectUserCourseEnrollment({
            userId,
            courseId
          });
          if (isEnrolled) return true;
          return false;
        } catch (error) {
          throw new yup.ValidationError(
            `The course with code ${courseCode} does not exist`
          );
        }
      }
    ),
  semester: yup
    .string()
    .label("Semester")
    .required("The semester is required")
    .typeError("The semester must be a string"),
  yearOfStudy: yup
    .number()
    .label("Year of Study")
    .required("The year of study is required")
    .typeError("The year of study must be a number"),
  lectureType: yup
    .string()
    .label("Lecture Type")
    .required("The lecture type is required")
    .oneOf(
      ["audio", "text", "link"],
      "The lecture type must be audio, text or link"
    ),
  lectureTitle: yup
    .string()
    .label("Lecture Title")
    .notRequired()
    .typeError("The lecture title must be a string"),
  lecture: yup
    .string()
    .label("Lecture")
    .when("lectureType", {
      is: "text",
      then: yup
        .string()
        .required("The lecture text is required for type `text`")
        .typeError("The lecture must be a string"),
      otherwise: yup.string().notRequired()
    })
    .when("lectureType", {
      is: "link",
      then: yup
        .string()
        .required("The lecture link is required for type `link`")
        .url("The lecture must be a valid URL for type `link`"),
      otherwise: yup.string().notRequired()
    })
});

module.exports = postLectureSchema;
