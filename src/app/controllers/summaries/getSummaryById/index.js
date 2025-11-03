const handleAPIError = require("~root/utils/handleAPIError");
const fetchSummaryById = require("~root/actions/summaries/fetchSummaryById");
const getSummaryByIdSchema = require("./schemas/getSummaryByIdSchema");

const getSummaryById = async (req, res) => {
  const { userId } = req.user;
  const { summaryId } = req.params;

  try {
    await getSummaryByIdSchema.validate({ summaryId }, { abortEarly: true });
    const { summary } = await fetchSummaryById({
      userId,
      summaryId
    });

    res.status(200).send({
      summary
    });
  } catch (err) {
    handleAPIError(res, err);
  }
};

module.exports = getSummaryById;
