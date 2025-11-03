const createUser = require("~root/actions/users/createUser");
const handleAPIError = require("~root/utils/handleAPIError");
const { STUDENT } = require("~root/constants/userTypes");
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

    const { user } = await createUser({
      firstName,
      lastName,
      email,
      password,
      userTypeId: userTypeId || STUDENT
    });

    res.status(201).send({
      user
    });
  } catch (err) {
    handleAPIError(res, err);
  }
};

module.exports = postUser;
