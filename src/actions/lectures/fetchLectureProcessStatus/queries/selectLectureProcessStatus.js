const { submitQuery, camelKeys, getFirst } = require("~root/lib/database");

const selectLectureProcessStatus = ({ taskId }) => submitQuery`
    SELECT
        task_id AS id,
        task_type,
        status,
        message,
        progress_percentage AS progress,
        created_at,
        updated_at
    FROM
        model_stack_processor_tasks
    WHERE
        task_id = ${taskId}
`;

module.exports = getFirst(camelKeys(selectLectureProcessStatus));
