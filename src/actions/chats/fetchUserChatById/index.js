const selectUserChatById = require("./queries/selectUserChatById");

const fetchUserChatById = async ({ chatId }) => {
  const chat = await selectUserChatById({ chatId });

  return { chat };
};

module.exports = fetchUserChatById;
