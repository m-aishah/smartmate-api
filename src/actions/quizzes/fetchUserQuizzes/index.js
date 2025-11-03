const selectUserQuizzes = require("./queries/selectUserQuizzes");

const fetchUserQuizzes = async ({ userId }) => {
  const quizzes = await selectUserQuizzes({ userId });

  return { quizzes };
};

module.exports = fetchUserQuizzes;
