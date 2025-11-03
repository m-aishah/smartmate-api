const selectUserChats = require("./queries/selectUserChats");

const fetchUserChats = async ({ userId }) => {
  const chats = await selectUserChats({ userId });

  return chats;
};

module.exports = fetchUserChats;
