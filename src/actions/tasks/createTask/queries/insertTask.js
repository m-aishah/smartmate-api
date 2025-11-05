const {
  submitQuery,
  getInsertId,
  sqlValueOrNull
} = require("~root/lib/database");

const insertTask = ({
  userId,
  title,
  description,
  priority,
  dueDate,
  completed
}) => submitQuery`

    INSERT INTO todos
    (
        created_by,
        todo_title,
        todo_description,
        is_completed,
        priority,
        due_date
    )
    VALUES
    (
        ${userId},
        ${title},
        ${description},
        ${completed},
        ${priority},
        ${sqlValueOrNull(dueDate)}
    )
`;

module.exports = getInsertId(insertTask);
