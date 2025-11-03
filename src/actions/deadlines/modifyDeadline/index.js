const updateDeadline = require("./queries/updateDeadline");

const modifyDeadline = async ({ deadlineId, userId, title, date }) => {
  const updatedDeadline = await updateDeadline({
    deadlineId,
    userId,
    title,
    date
  });

  return { updatedDeadline };
};

module.exports = modifyDeadline;
