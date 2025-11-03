const yup = require("yup");
const selectSummaryById = require("./queries/selectSummaryById");

const deleteSummarySchema = yup.object().shape({
  summaryId: yup
    .number()
    .integer()
    .required()
    .label("Summary ID")
    .typeError("The summary ID must be an integer")
    .test(
      "doesSummaryExist",
      "The summary does not exist, make sure the summaryId is valid ",
      async function doesSummaryExist(summaryId) {
        if (!summaryId) return false;
        const count = await selectSummaryById({ summaryId });
        if (count === 0) return false;
        return true;
      }
    )
    .test(
      "isSummaryDeleted",
      "The summary is already deleted",
      async function isSummaryDeleted(summaryId) {
        if (!summaryId) return false;
        const { isDeleted } = await selectSummaryById({ summaryId });
        if (isDeleted) return false;
        return true;
      }
    )
});

module.exports = deleteSummarySchema;
