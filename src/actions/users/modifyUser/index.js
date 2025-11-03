const updateUserDetails = require("./queries/updateUserDetails");

const modifyUser = async ({
  userId,
  firstName,
  lastName,
  studentNumber,
  university,
  yearOfStudy,
  currentSemester,
  langugaePreference
}) => {
  const userDetails = await updateUserDetails({
    userId,
    firstName,
    lastName,
    studentNumber,
    university,
    yearOfStudy,
    currentSemester,
    langugaePreference
  });

  return { userDetails };
};

module.exports = modifyUser;
