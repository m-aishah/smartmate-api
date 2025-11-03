const { submitQuery, sql, sqlReduce } = require("~root/lib/database");

const NO_UPDATE = Symbol("NO_UPDATE");

const updateChat = async ({
  chatId,
  chatTitle = NO_UPDATE,
  messages = NO_UPDATE,
  systemPromptId = NO_UPDATE
}) => {
  const updates = [];
  if (chatTitle !== NO_UPDATE) {
    updates.push(sql`chat_title = ${chatTitle}`);
  }
  if (messages !== NO_UPDATE) {
    updates.push(sql`messages = ${JSON.stringify(messages)}`);
  }
  if (systemPromptId !== NO_UPDATE) {
    updates.push(sql`system_prompt_id = ${systemPromptId}`);
  }

  if (updates.length !== 0) {
    return submitQuery`
              UPDATE 
                  chats
              SET 
                  ${updates.reduce(sqlReduce)}
                  WHERE 
                      chat_id = ${chatId}`;
  }

  return Promise.resolve();
};

module.exports = updateChat;
