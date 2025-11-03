const { submitQuery, camelKeys } = require("~root/lib/database");

const selectUserSummaries = async ({ userId }) => submitQuery`
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
        created_by = ${userId}
`;

module.exports = camelKeys(selectUserSummaries);
