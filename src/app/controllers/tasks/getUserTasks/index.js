const handleAPIError = require("~root/utils/handleAPIError");
const fetchUserTasks = require("~root/actions/tasks/fetchUserTasks");

const getUserTasks = async (req, res) => {
  const { userId } = req.user;

  try {
    const { tasks } = await fetchUserTasks({
      userId
    });

    res.send(tasks);
  } catch (err) {
    handleAPIError(res, err);
  }
};

module.exports = getUserTasks;
