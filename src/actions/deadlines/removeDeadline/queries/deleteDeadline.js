const { submitQuery } = require("~root/lib/database");

const deleteDeadline = async ({ deadlineId }) => {
  await submitQuery`
        DELETE FROM
            deadlines
        WHERE deadline_id = ${deadlineId}
    `;
};

module.exports = deleteDeadline;
