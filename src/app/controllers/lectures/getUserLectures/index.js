const fetchUserLectures = require("~root/actions/lectures/fetchUserLectures");
const handleAPIError = require("~root/utils/handleAPIError");

const getUserLectures = async (req, res) => {
  const { userId } = req.user;
  try {
    const { lectures } = await fetchUserLectures({
      userId
    });

    res.send({
      lectures
    });
  } catch (err) {
    handleAPIError(res, err);
  }
};

module.exports = getUserLectures;
