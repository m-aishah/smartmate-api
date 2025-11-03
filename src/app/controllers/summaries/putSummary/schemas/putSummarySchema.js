const yup = require("yup");

const putSummarySchema = yup.object().shape({
  summaryTitle: yup
    .string()
    .notRequired()
    .label("Summary Title")
    .typeError("The summary title must be a string"),
  summaryDescription: yup
    .string()
    .label("Summary Description")
    .notRequired()
    .typeError("The summary description must be a string"),
  briefSummary: yup
    .string()
    .label("Brief Summary")
    .notRequired()
    .typeError("The brief summary must be a string"),
  detailedSummary: yup
    .string()
    .label("Detailed Summary")
    .notRequired()
    .typeError("The detailed summary must be a string"),
  keyPoints: yup
    .array()
    .of(
      yup
        .string()
        .label("Key Point")
        .typeError("Each key point must be a string")
    )
    .label("Key Points")
    .notRequired()
    .typeError("The key points must be an array of strings")
    .min(1, "At least one key point is required")
});

module.exports = putSummarySchema;
