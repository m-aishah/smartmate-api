const { submitQuery, getInsertId } = require("~root/lib/database");

const deleteProcessedTask = async ({ taskId }) => submitQuery`
    DELETE
        FROM
            model_stack_processor_tasks
    WHERE
        task_id = ${taskId}
        `;
module.exports = getInsertId(deleteProcessedTask);
