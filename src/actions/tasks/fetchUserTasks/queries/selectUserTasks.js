const { submitQuery, camelKeys } = require("~root/lib/database");

const selectUserTasks = async ({ userId }) => submitQuery`
    SELECT 
        todo_id AS id,
        todo_title AS title,
        todo_description AS description,
        is_completed AS completed,
        priority,
        due_date,
        created_at,
        updated_at

    FROM 
        todos
    WHERE
        todos.created_by = ${userId}
    AND
        is_deleted = FALSE
`;

module.exports = camelKeys(selectUserTasks);
