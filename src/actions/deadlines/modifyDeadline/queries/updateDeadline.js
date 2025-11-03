const {
  submitQuery,
  sql,
  sqlReduce,
  sqlValueOrNull
} = require("~root/lib/database");

const NO_UPDATE = Symbol("NO_UPDATE");

const updateDeadline = ({
  deadlineId,
  userId,
  title = NO_UPDATE,
  date = NO_UPDATE
}) => {
  const updates = [];

  if (title !== NO_UPDATE) {
    updates.push(sql`deadline_title = ${sqlValueOrNull(title)}`);
  }

  if (date !== NO_UPDATE) {
    updates.push(sql`date = ${sqlValueOrNull(date)}`);
  }

  if (updates.length !== 0) {
    updates.push(sql`updated_at = NOW()`);

    return submitQuery`
            UPDATE
                deadlines
            SET
                ${updates.reduce(sqlReduce)}
            WHERE
                deadline_id = ${deadlineId} AND created_by = ${userId}`;
  }

  return Promise.resolve();
};

module.exports = updateDeadline;
