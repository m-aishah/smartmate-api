const { submitQuery, getInsertId } = require("~root/lib/database");

const insertModelProcessorTask = ({
  taskId,
  taskType,
  result,
  status,
  message,
  statusUrl,
  progressPercentage
}) => submitQuery`
  INSERT INTO model_stack_processor_tasks
  (
    task_id,
    task_type,
    result,
    status,
    message,
    status_url,
    progress_percentage
  )
  VALUES
  (
    ${taskId},
    ${taskType},
    ${result},
    ${status},
    ${message},
    ${statusUrl},
    ${progressPercentage}
  )
`;

module.exports = getInsertId(insertModelProcessorTask);
