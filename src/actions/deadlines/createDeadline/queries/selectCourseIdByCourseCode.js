const { submitQuery, camelKeys, getFirst } = require("~root/lib/database");

const selectCourseIdByCourseCode = ({ courseCode }) => submitQuery`
    SELECT
        course_id
    FROM
        courses
    WHERE
        course_code = ${courseCode}
`;

module.exports = getFirst(camelKeys(selectCourseIdByCourseCode));
