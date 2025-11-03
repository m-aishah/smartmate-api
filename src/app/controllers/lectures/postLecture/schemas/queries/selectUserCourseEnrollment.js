const { submitQuery, camelKeys, getFirst } = require("~root/lib/database");

const selectUserCourseEnrollment = ({ userId, courseId }) => submitQuery`
    SELECT
        course_enrolment_id
    FROM 
        course_enrolments
    WHERE
        student_id = ${userId}
        AND course_id = ${courseId};
`;

module.exports = getFirst(camelKeys(selectUserCourseEnrollment));
