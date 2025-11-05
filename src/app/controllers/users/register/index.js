const createUser = require("~root/actions/users/createUser");
const createUserAnalytics = require("~root/actions/users/createUserAnalytics");
const handleAPIError = require("~root/utils/handleAPIError");
const { STUDENT } = require("~root/constants/userTypes");
const { ZERO } = require("~root/constants/general");
const postUserSchema = require("./schemas/postUserSchema");

const postUser = async (req, res) => {
  const { firstName, lastName, email, password, userTypeId } = req.body;

  try {
    await postUserSchema.validate(
      {
        firstName,
        lastName,
        email,
        password,
        userTypeId
      },
      {
        abortEarly: false
      }
    );

    const { insertedUser } = await createUser({
      firstName,
      lastName,
      email,
      password,
      userTypeId: STUDENT
    });

    const { insertedUserAnalytics } = await createUserAnalytics({
      userId: insertedUser,
      engagementId: ZERO,
      streak: ZERO,
      totalHoursStudied: ZERO
    });

    res.status(201).send({
      user: insertedUser,
      userAnalytics: insertedUserAnalytics
    });
  } catch (err) {
    handleAPIError(res, err);
  }
};

module.exports = postUser;
