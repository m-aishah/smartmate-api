const yup = require("yup");

const putLectureSchema = yup.object().shape({
  lectureTitle: yup
    .string()
    .notRequired()
    .label("Lecture Title")
    .typeError("The lecture title must be a string"),
  lectureDescription: yup
    .string()
    .label("Lecture Description")
    .notRequired()
    .typeError("The lecture description must be a string"),
  isFavourite: yup
    .boolean()
    .label("Is Favourite")
    .notRequired()
    .typeError("The isFavourite must be a boolean"),
  isArchived: yup
    .boolean()
    .label("Is Archived")
    .notRequired()
    .typeError("The isArchived must be a boolean"),
  isDeleted: yup
    .boolean()
    .label("Is Deleted")
    .notRequired()
    .typeError("The isDeleted must be a boolean"),
  isPinned: yup
    .boolean()
    .label("Is Pinned")
    .notRequired()
    .typeError("The isPinned must be a boolean")
});

module.exports = putLectureSchema;
