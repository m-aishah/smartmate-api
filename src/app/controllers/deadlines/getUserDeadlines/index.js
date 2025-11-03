const handleAPIError = require("~root/utils/handleAPIError");
const fetchUserDeadlines = require("~root/actions/deadlines/fetchUserDeadlines");

const getUserDeadlines = async (req, res) => {
  const { userId } = req.user;

  try {
    const { deadlines } = await fetchUserDeadlines({
      userId
    });

    res.send({
      deadlines
    });
  } catch (err) {
    handleAPIError(res, err);
  }
};

module.exports = getUserDeadlines;
