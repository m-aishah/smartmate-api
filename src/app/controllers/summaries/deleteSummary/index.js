const handleAPIError = require("~root/utils/handleAPIError");
const removeSummary = require("~root/actions/summaries/removeSummary");
const deleteSummarySchema = require("./schemas/deleteSummarySchema");

const deleteSummary = async (req, res) => {
  const { summaryId } = req.params;

  try {
    await deleteSummarySchema.validate(
      { summaryId },
      {
        abortEarly: false
      }
    );

    await removeSummary({ summaryId });

    res
      .status(204)
      .send({ success: true, message: "Summary deleted successfully" });
  } catch (err) {
    handleAPIError(res, err);
  }
};

module.exports = deleteSummary;
