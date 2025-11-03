const { submitQuery, getFirst } = require("~root/lib/database");

const selectSummaryById = ({ summaryId }) => submitQuery`
    SELECT
        COUNT(*) AS count
    FROM
        summaries
    WHERE
        summary_id = ${summaryId}
`;

module.exports = getFirst(selectSummaryById, "count");
