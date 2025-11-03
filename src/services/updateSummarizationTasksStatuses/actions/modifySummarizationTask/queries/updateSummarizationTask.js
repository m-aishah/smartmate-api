const {
  submitQuery,
  sql,
  sqlReduce,
  sqlValueOrNull
} = require("~root/lib/database");

const NO_UPDATE = Symbol("NO_UPDATE");

const updateSummarizationTask = ({
  taskId,
  result = NO_UPDATE,
  status = NO_UPDATE,
  message = NO_UPDATE,
  progressPercentage = NO_UPDATE,
  completedAt = NO_UPDATE
}) => {
  const updates = [];

  if (result !== NO_UPDATE) {
    updates.push(sql`result = ${sqlValueOrNull(JSON.stringify(result))}`);
  }

  if (status !== NO_UPDATE) {
    updates.push(sql`status = ${sqlValueOrNull(status)}`);
  }

  if (message !== NO_UPDATE) {
    updates.push(sql`message = ${sqlValueOrNull(message)}`);
  }

  if (progressPercentage !== NO_UPDATE) {
    updates.push(
      sql`progress_percentage = ${sqlValueOrNull(progressPercentage)}`
    );
  }

  if (completedAt !== NO_UPDATE) {
    updates.push(sql`completed_at = ${sqlValueOrNull(completedAt)}`);
  }

  if (updates.length !== 0) {
    updates.push(sql`updated_at = NOW()`);

    return submitQuery`
            UPDATE
                model_stack_processor_tasks
            SET
                ${updates.reduce(sqlReduce)}
            WHERE
                task_id = ${taskId}`;
  }

  return Promise.resolve();
};

module.exports = updateSummarizationTask;
