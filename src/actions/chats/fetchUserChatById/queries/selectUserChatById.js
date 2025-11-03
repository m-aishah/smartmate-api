const { submitQuery, camelKeys, getFirst } = require("~root/lib/database");

const selectUserChatById = ({ chatId }) => submitQuery`
    SELECT
        chat_id AS id,
        chat_title AS title,
        chat_description AS description,
        created_by,
        messages,
        system_prompt_id,
        created_at,
        updated_at
    FROM 
        chats
    WHERE 
        chat_id = ${chatId}
    AND 
        is_deleted = FALSE;
`;

module.exports = getFirst(camelKeys(selectUserChatById));
