const { submitQuery, camelKeys, getFirst } = require("~root/lib/database");

const selectLectureById = ({ userId, lectureId }) => submitQuery`
    SELECT
        lecture_id AS id,
        lectures.course_id,
        lectures.created_by,
        lecture_title AS title,
        lecture_description AS description,
        lectures.summary_id,
        summary_title,
        summary_description,
        brief_summary,
        detailed_summary,
        key_points,
        recording_id,
        mspt.status AS status,
        mspt.progress_percentage AS progress,
        is_favourite,
        is_archived,
        is_pinned,
        lectures.created_at,
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
        lectures.lecture_id = ${lectureId}
    AND
        lectures.created_by = ${userId}
`;

module.exports = getFirst(camelKeys(selectLectureById));
