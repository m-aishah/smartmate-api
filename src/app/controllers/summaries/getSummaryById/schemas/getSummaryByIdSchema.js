const yup = require("yup");
const selectSummaryById = require("./queries/selectSummaryById");

const getSummaryByIdSchema = yup.object().shape({
  summaryId: yup
    .number()
    .label("Summary Id")
    .required("The summary Id is required")
    .typeError("The summary Id must be a number")
    .test("DoesSummaryExist", "The summary does not exist", async function test(
      summaryId
    ) {
      const isSummary = await selectSummaryById({ summaryId });
      if (isSummary) return true;

      return false;
    })
});

module.exports = getSummaryByIdSchema;
