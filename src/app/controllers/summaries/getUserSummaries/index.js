const handleAPIError = require("~root/utils/handleAPIError");
const fetchUserSummaries = require("~root/actions/summaries/fetchUserSummaries");

const getUserSummaries = async (req, res) => {
  const { userId } = req.user;
  try {
    const { summaries } = await fetchUserSummaries({
      userId
    });

    res.send({
      summaries
    });
  } catch (err) {
    handleAPIError(res, err);
  }
};

module.exports = getUserSummaries;
