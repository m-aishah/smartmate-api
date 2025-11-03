const { submitQuery, camelKeys } = require("~root/lib/database");

const selectLecturesBySummaryId = async ({ summaryId }) => submitQuery`
    SELECT DISTINCT
        lecture_id
    FROM
        summaries, lectures
    WHERE
        lectures.summary_id = ${summaryId}
`;

module.exports = camelKeys(selectLecturesBySummaryId);
