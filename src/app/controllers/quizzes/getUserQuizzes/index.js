const handleAPIError = require("~root/utils/handleAPIError");
const fetchUserQuizzes = require("~root/actions/quizzes/fetchUserQuizzes");

const getUserQuizzes = async (req, res) => {
  const { userId } = req.user;
  try {
    const { quizzes } = await fetchUserQuizzes({
      userId
    });

    res.send({
      quizzes
    });
  } catch (err) {
    handleAPIError(res, err);
  }
};

module.exports = getUserQuizzes;
