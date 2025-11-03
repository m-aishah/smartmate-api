const { submitQuery, camelKeys, getFirst } = require("~root/lib/database");

const selectUserChatById = ({ chatId }) => submitQuery`
    SELECT
        chat_id
    FROM
        chats
    WHERE
        chat_id = ${chatId};`;

module.exports = getFirst(camelKeys(selectUserChatById));
