const jwt = require("jsonwebtoken");
const fetchUserById = require("~root/actions/users/fetchUserById");
const modifyUser = require("~root/actions/users/modifyUser");
const handleAPIError = require("~root/utils/handleAPIError");

const putUserDetails = async (req, res) => {
  const { userId } = req.user;
  const {
    firstName,
    lastName,
    studentNumber,
    university,
    yearOfStudy,
    currentSemester,
    langugaePreference
  } = req.body;
  try {
    const { userDetails } = await modifyUser({
      userId,
      firstName,
      lastName,
      studentNumber,
      university,
      yearOfStudy,
      currentSemester,
      langugaePreference
    });

    const { user } = await fetchUserById({
      userId
    });

    const accessToken = jwt.sign({ ...user }, process.env.JWT_SECRET, {
      expiresIn: "365d" // 1 year
    });

    res.send({
      userDetails,
      accessToken
    });
  } catch (err) {
    handleAPIError(res, err);
  }
};

module.exports = putUserDetails;
