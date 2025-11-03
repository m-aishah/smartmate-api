const { submitQuery, camelKeys } = require("~root/lib/database");

const selectUserChats = ({ userId }) => submitQuery`
    SELECT
        chat_id AS id,
        chat_title AS title,
        chat_description AS description,
        cover_image,
        is_favourite,
        created_by,
        created_at,
        updated_at
    FROM
        chats
    WHERE
        created_by = ${userId}
        AND is_deleted = FALSE;
`;

module.exports = camelKeys(selectUserChats);
