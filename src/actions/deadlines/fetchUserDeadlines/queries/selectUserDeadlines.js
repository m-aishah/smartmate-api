const { submitQuery, camelKeys } = require("~root/lib/database");

const selectUserDeadlines = async ({ userId }) => submitQuery`
    SELECT 
        deadline_id AS id,
        deadline_title AS title,
        deadline_description AS description,
        deadline_date AS date,
        CONCAT(courses.course_code, ' - ', courses.course_name) AS course,
        deadlines.created_at AS created_at,
        deadlines.updated_at AS updated_at

    FROM 
        deadlines, courses
    WHERE
        deadlines.created_by = ${userId}
        AND deadlines.course_id = courses.course_id
    AND
        deadlines.is_deleted = FALSE
`;

module.exports = camelKeys(selectUserDeadlines);
