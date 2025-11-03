const { submitQuery, camelKeys } = require("~root/lib/database");

const selectUserCourses = ({ userId }) => submitQuery`
    SELECT
        courses.course_id AS id,
        course_code,
        course_name
    FROM
        courses, course_enrolments
    WHERE
            course_enrolments.student_id = ${userId}
        AND 
            course_enrolments.course_id = courses.course_id
        AND
            course_enrolments.is_deleted = FALSE
`;
module.exports = camelKeys(selectUserCourses);
