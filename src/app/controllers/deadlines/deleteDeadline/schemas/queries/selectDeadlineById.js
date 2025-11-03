const { submitQuery, getFirst } = require("~root/lib/database");

const selectDeadlineById = ({ deadlineId }) => submitQuery`
    SELECT
        COUNT(*) AS count
    FROM
        deadlines
    WHERE
        deadline_id = ${deadlineId}
`;

module.exports = getFirst(selectDeadlineById, "count");
