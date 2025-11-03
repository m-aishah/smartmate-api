const { submitQuery, camelKeys, getFirst } = require("~root/lib/database");

const selectSummarisationTaskBySummaryId = async ({ summaryId }) => submitQuery`
    SELECT
        summarisation_task_id
    FROM
        summaries
    WHERE
        summary_id = ${summaryId}
        
`;

module.exports = getFirst(camelKeys(selectSummarisationTaskBySummaryId));
