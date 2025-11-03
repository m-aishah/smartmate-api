const { submitQuery, getInsertId } = require("~root/lib/database");

const insertChat = async ({ chatTitle, messages, systemPromptId, userId }) =>
  submitQuery`
      INSERT INTO chats (
        chat_title,
        created_by,
        system_prompt_id,
        messages
      )
      VALUES (
        ${chatTitle},
        ${userId},
        ${systemPromptId},
        ${JSON.stringify(messages)}
      );
    `;

module.exports = getInsertId(insertChat);
