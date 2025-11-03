const handleAPIError = require("~root/utils/handleAPIError");
const fetchUserCourses = require("~root/actions/courses/fetchUserCourses");

const getUserCourses = async (req, res) => {
  const { userId } = req.user;

  try {
    const { courses } = await fetchUserCourses({ userId });

    res.send({
      courses
    });
  } catch (err) {
    handleAPIError(res, err);
  }
};

module.exports = getUserCourses;
