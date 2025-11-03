const { submitQuery, getFirst } = require("~root/lib/database");

const selectLectureById = ({ lectureId }) => submitQuery`
    SELECT
        COUNT(*) AS count
    FROM
        lectures
    WHERE
        lecture_id = ${lectureId}
`;

module.exports = getFirst(selectLectureById, "count");
