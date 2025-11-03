const { submitQuery, camelKeys, getFirst } = require("~root/lib/database");

const selectLectureById = async ({ lectureId }) => submitQuery`
    SELECT
        lecture_id
    FROM
        lectures
    WHERE
        lecture_id = ${lectureId}
`;

module.exports = getFirst(camelKeys(selectLectureById));
