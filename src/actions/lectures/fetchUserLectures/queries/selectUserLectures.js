const { submitQuery, camelKeys } = require("~root/lib/database");

const selectUserLectures = async ({ userId }) => submitQuery`
    SELECT 
        lecture_id AS id,
        lectures.course_id AS course_id,
        lectures.created_by AS created_by,
        lecture_title AS title,
        lecture_description AS description,
        lectures.summary_id AS summary_id,
        summary_title,
        summary_description,
        brief_summary,
        detailed_summary AS summary,
        key_points,
        recording_id,
        mspt.status AS status,
        mspt.progress_percentage AS progress,
        is_favourite,
        is_archived,
        is_pinned ,
        lectures.created_at AS date,
        lectures.updated_at
    FROM 
        lectures
    LEFT JOIN
        summaries
    ON
        lectures.summary_id = summaries.summary_id
    LEFT JOIN
        model_stack_processor_tasks AS mspt
    ON
         summaries.summarisation_task_id = mspt.task_id
    WHERE
        lectures.created_by = ${userId}
    AND
        is_deleted = FALSE
`;

module.exports = camelKeys(selectUserLectures);
