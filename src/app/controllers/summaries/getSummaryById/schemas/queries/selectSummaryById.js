const { submitQuery, camelKeys, getFirst } = require("~root/lib/database");

const selectSummaryById = async ({ summaryId }) => submitQuery`
    SELECT
        summary_id
    FROM
        summaries
    WHERE
        summary_id = ${summaryId}
`;

module.exports = getFirst(camelKeys(selectSummaryById));
