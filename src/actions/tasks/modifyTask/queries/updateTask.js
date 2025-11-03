const {
  submitQuery,
  sql,
  sqlReduce,
  sqlValueOrNull
} = require("~root/lib/database");

const NO_UPDATE = Symbol("NO_UPDATE");

const updateTask = ({
  taskId,
  userId,
  title = NO_UPDATE,
  description = NO_UPDATE,
  priority = NO_UPDATE,
  dueDate = NO_UPDATE,
  completed = NO_UPDATE
}) => {
  const updates = [];

  if (title !== NO_UPDATE) {
    updates.push(sql`todo_title = ${sqlValueOrNull(title)}`);
  }

  if (description !== NO_UPDATE) {
    updates.push(sql`todo_description = ${sqlValueOrNull(description)}`);
  }

  if (priority !== NO_UPDATE) {
    updates.push(sql`priority = ${sqlValueOrNull(priority)}`);
  }

  if (dueDate !== NO_UPDATE) {
    updates.push(sql`due_date = ${sqlValueOrNull(dueDate)}`);
  }

  if (completed !== NO_UPDATE) {
    updates.push(sql`is_completed = ${sqlValueOrNull(completed)}`);
  }

  if (updates.length !== 0) {
    updates.push(sql`updated_at = NOW()`);

    return submitQuery`
            UPDATE
                todos
            SET
                ${updates.reduce(sqlReduce)}
            WHERE
                todo_id = ${taskId} AND created_by = ${userId}`;
  }

  return Promise.resolve();
};

module.exports = updateTask;
