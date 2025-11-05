const insertUser = require("./queries/insertUser");

const createUser = async ({
  firstName,
  lastName,
  email,
  password,
  userTypeId
}) => {
  const insertedUser = await insertUser({
    firstName,
    lastName,
    email,
    password,
    userTypeId
  });

  return { insertedUser };
};

module.exports = createUser;
