const handleAPIError = require("~root/utils/handleAPIError");
const fetchUserData = require("~root/actions/users/fetchUserData");

const getUserData = async (req, res) => {
  const { userId } = req.user;

  try {
    const userData = await fetchUserData({ userId });

    res.status(200).send({
      success: true,
      message: "User data retrieved successfully",
      user: userData
    });
  } catch (err) {
    handleAPIError(res, err);
  }
};

module.exports = getUserData;
