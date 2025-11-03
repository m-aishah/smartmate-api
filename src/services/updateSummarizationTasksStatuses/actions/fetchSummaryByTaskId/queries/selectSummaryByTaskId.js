const { submitQuery, camelKeys, getFirst } = require("~root/lib/database");

const selectSummaryByTaskId = async ({ taskId }) => submitQuery`
    SELECT
        summary_id
    FROM
        summaries
    WHERE
        summaries.summarisation_task_id = ${taskId}
`;

module.exports = getFirst(camelKeys(selectSummaryByTaskId));
