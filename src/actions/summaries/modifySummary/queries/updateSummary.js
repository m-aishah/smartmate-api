const {
  submitQuery,
  sql,
  sqlReduce,
  sqlValueOrNull
} = require("~root/lib/database");

const NO_UPDATE = Symbol("NO_UPDATE");

const updateSummary = ({
  summaryId,
  userId,
  summaryTitle = NO_UPDATE,
  summaryDescription = NO_UPDATE,
  briefSummary = NO_UPDATE,
  detailedSummary = NO_UPDATE,
  keyPoints = NO_UPDATE
}) => {
  const updates = [];

  if (summaryTitle !== NO_UPDATE) {
    updates.push(sql`summary_title = ${sqlValueOrNull(summaryTitle)}`);
  }

  if (summaryDescription !== NO_UPDATE) {
    updates.push(
      sql`summary_description = ${sqlValueOrNull(summaryDescription)}`
    );
  }

  if (briefSummary !== NO_UPDATE) {
    updates.push(sql`brief_summary = ${sqlValueOrNull(briefSummary)}`);
  }

  if (detailedSummary !== NO_UPDATE) {
    updates.push(sql`detailed_summary = ${sqlValueOrNull(detailedSummary)}`);
  }

  if (keyPoints !== NO_UPDATE) {
    updates.push(
      sql`key_points = ${sqlValueOrNull(JSON.stringify(keyPoints))}`
    );
  }

  if (updates.length !== 0) {
    updates.push(sql`updated_at = NOW()`);

    return submitQuery`
            UPDATE
                summaries
            SET
                ${updates.reduce(sqlReduce)}
            WHERE
                summary_id = ${summaryId} AND created_by = ${userId}`;
  }

  return Promise.resolve();
};

module.exports = updateSummary;
