const handleAPIError = require("~root/utils/handleAPIError");
const modifySummary = require("~root/actions/summaries/modifySummary");
const putSummarySchema = require("./schemas/putSummarySchema");

const putSummary = async (req, res) => {
  const { userId } = req.user;
  const { summaryId } = req.params;
  const {
    summaryTitle,
    summaryDescription,
    briefSummary,
    detailedSummary,
    keyPoints
  } = req.body;

  try {
    await putSummarySchema.validate(
      {
        summaryTitle,
        summaryDescription,
        briefSummary,
        detailedSummary,
        keyPoints
      },
      {
        abortEarly: false
      }
    );

    const { updatedSummary } = await modifySummary({
      summaryId,
      userId,
      summaryTitle,
      summaryDescription,
      briefSummary,
      detailedSummary,
      keyPoints
    });

    res.status(201).send({
      success: true,
      message: "Summary updated successfully",
      summary: updatedSummary
    });
  } catch (err) {
    handleAPIError(res, err);
  }
};

module.exports = putSummary;
