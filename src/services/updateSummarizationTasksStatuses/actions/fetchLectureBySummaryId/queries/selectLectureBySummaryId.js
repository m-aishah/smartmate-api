const { submitQuery, camelKeys, getFirst } = require("~root/lib/database");

const selectLectureBySummaryId = async ({ summaryId }) => submitQuery`
    SELECT
        lecture_id, 
        created_by AS user_id
    FROM
        lectures
    WHERE
        lectures.summary_id = ${summaryId}
`;

module.exports = getFirst(camelKeys(selectLectureBySummaryId));
