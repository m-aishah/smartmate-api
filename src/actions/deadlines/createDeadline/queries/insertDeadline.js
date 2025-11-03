const { submitQuery, getInsertId } = require("~root/lib/database");

const insertDeadline = ({ userId, title, date, courseId }) => submitQuery`

    INSERT INTO deadlines
    (
        created_by,
        deadline_title,
        deadline_date,
        course_id
    )
    VALUES
    (
        ${userId},
        ${title},
        ${date},
        ${courseId}
    )
`;

module.exports = getInsertId(insertDeadline);
