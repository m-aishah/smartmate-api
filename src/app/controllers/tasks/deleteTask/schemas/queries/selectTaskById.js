const { submitQuery, getFirst } = require("~root/lib/database");

const selectTaskById = ({ taskId }) => submitQuery`
    SELECT
        COUNT(*) AS count
    FROM
        todos
    WHERE
        todo_id = ${taskId}
`;

module.exports = getFirst(selectTaskById, "count");
