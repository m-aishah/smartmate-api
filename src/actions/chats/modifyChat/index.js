const updateChat = require("./queries/updateChat");

const modifyChat = async ({
  chatId,
  chatTitle,
  messages,
  systemPromptId,
  updatedAt
}) => {
  await updateChat({
    chatId,
    chatTitle,
    messages,
    systemPromptId,
    updatedAt
  });

  return { chatId };
};

module.exports = modifyChat;
