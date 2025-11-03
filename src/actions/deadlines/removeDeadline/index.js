const deleteDeadline = require("./queries/deleteDeadline");

const removeDeadline = async ({ deadlineId }) => {
  await deleteDeadline({
    deadlineId
  });
};

module.exports = removeDeadline;
