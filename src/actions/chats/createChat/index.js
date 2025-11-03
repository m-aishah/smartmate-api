const { DEFAULT_PROMPT_ID } = require("~root/constants/chatsConstants");
const insertChat = require("./queries/insertChat");

const createChat = async ({
  chatTitle,
  messages,
  systemPromptId = DEFAULT_PROMPT_ID,
  userId
}) => {
  const newChatId = await insertChat({
    chatTitle,
    messages,
    systemPromptId,
    userId
  });

  return { newChatId };
};

module.exports = createChat;
