const { submitQuery } = require("~root/lib/database");

const deleteTask = async ({ taskId }) => {
  await submitQuery`
        DELETE FROM
            todos
        WHERE todo_id = ${taskId}
    `;
};

module.exports = deleteTask;
