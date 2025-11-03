const { submitQuery, camelKeys, getFirst } = require("~root/lib/database");

const selectSummaryById = ({ userId, summaryId }) => submitQuery`
    SELECT
        summary_id AS id,
        course_id,
        created_by,
        summary_title AS title,
        summary_description AS description,
        brief_summary as brief,
        detailed_summary AS detailed,
        key_points,
        summarisation_task_id AS task_id,
        created_at,
        updated_at
    FROM
        summaries
    WHERE
        summaries.summary_id = ${summaryId}
    AND
        summaries.created_by = ${userId}
`;

module.exports = getFirst(camelKeys(selectSummaryById));
